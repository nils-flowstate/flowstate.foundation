import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS ergänzt ggü. Spec §6.3, da capture-lead direkt aus dem Browser
// (PhoneInput) per fetch gerufen wird und sonst am Preflight scheitert.
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-flowstate-app, apikey, authorization",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("only POST", { status: 405, headers: cors });

  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const b = await req.json();
  // Pflichtfelder: phone, source_app, source_detail, session_id, consent_text_id
  if (!b.phone || !b.source_app || !b.session_id || !b.consent_text_id) {
    return new Response("missing fields", { status: 400, headers: cors });
  }

  // 1. Identity anlegen
  const { data: id, error: e1 } = await supa
    .from("identities")
    .insert({ first_seen_app: b.source_app })
    .select("id").single();
  if (e1) return new Response(e1.message, { status: 500, headers: cors });

  // 2. Trait (PII)
  await supa.from("identity_traits").insert({
    identity_id: id.id,
    phone: b.phone,
    email: b.email ?? null,
    language: b.language ?? null,
    source: b.source_detail ?? "lead_form",
  });

  // 3. Session stitchen
  await supa.from("sessions").update({ identity_id: id.id })
    .eq("id", b.session_id);

  // 4. Consent dokumentieren
  await supa.from("consent_log").insert({
    identity_id: id.id,
    session_id: b.session_id,
    consent_purpose: "lead_capture",
    consent_state: "granted",
    consent_text_id: b.consent_text_id,
    source: "lead_form",
    evidence: { form: b.source_detail, ua: req.headers.get("user-agent") },
  });

  // 5. Lead anlegen
  await supa.from("leads").insert({
    identity_id: id.id,
    source_app: b.source_app,
    source_detail: b.source_detail ?? "unknown",
  });

  // 6. Event protokollieren
  await supa.from("events").insert({
    identity_id: id.id,
    session_id: b.session_id,
    source_app: b.source_app,
    event_type: "lead_captured",
    properties: { source_detail: b.source_detail },
  });

  return new Response(JSON.stringify({ identity_id: id.id }), {
    headers: { ...cors, "content-type": "application/json" },
  });
});
