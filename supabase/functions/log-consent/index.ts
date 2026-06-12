// log-consent — schreibt Banner-Einwilligungen (Klaro) ins consent_log (DSGVO Art. 7).
// Wird aus dem Browser gerufen; daher CORS + verify_jwt=false. Nutzt Service-Role,
// um RLS-unabhängig (append-only) zu protokollieren.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-flowstate-app, apikey, authorization",
};

const PURPOSES = ["analytics", "marketing", "lead_capture", "newsletter"];
const STATES = ["granted", "denied", "withdrawn"];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("only POST", { status: 405, headers: cors });

  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const b = await req.json();

  if (!PURPOSES.includes(b.consent_purpose) || !STATES.includes(b.consent_state) || !b.consent_text_id) {
    return new Response("invalid consent payload", { status: 400, headers: cors });
  }

  // Session sicherstellen, damit der FK consent_log.session_id erfüllt ist
  // (Einwilligung kann vor dem ersten pageview/track-event erfolgen).
  if (b.session_id) {
    await supa.from("sessions").upsert({
      id: b.session_id,
      source_app: b.source_app ?? "foundation",
      last_seen_at: new Date().toISOString(),
    }, { onConflict: "id" });
  }

  const { error } = await supa.from("consent_log").insert({
    session_id: b.session_id ?? null,
    consent_purpose: b.consent_purpose,
    consent_state: b.consent_state,
    consent_text_id: b.consent_text_id,
    source: b.source ?? "cookie_banner",
    evidence: { ua: req.headers.get("user-agent"), ...(b.evidence ?? {}) },
  });

  if (error) return new Response(error.message, { status: 500, headers: cors });
  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...cors, "content-type": "application/json" },
  });
});
