import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Nur erlaubte Origins dürfen die Function aufrufen (Prod-Domains + lokaler Dev).
// Hinweis: apikey/authorization bleiben in den Allow-Headers, da der Browser sie
// (anon key) mitschickt — ohne sie scheitert der Preflight.
const ALLOWED_ORIGINS = [
  "https://flowstate.foundation",
  "https://www.flowstate.foundation",
  "http://localhost:5173",
  "http://localhost:4321",
];

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, x-flowstate-app, apikey, authorization",
    "Vary": "Origin",
  };
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("only POST", { status: 405, headers: cors });

  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // server-side; bypasst RLS
  );

  const body = await req.json();
  const sourceApp = req.headers.get("x-flowstate-app") ?? body.source_app ?? "foundation";

  // 1. Session sicherstellen (Upsert via session_id vom Client)
  const sessionId = body.session_id as string;
  if (!sessionId) return new Response("missing session_id", { status: 400, headers: cors });

  // IP hashen mit täglich rotierendem Salt (aus env). Fallback = aktuelles Datum,
  // damit die Funktion auch ohne gesetztes Secret nicht hart abstürzt (vgl. fn_hash_ip).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const salt = Deno.env.get("IP_HASH_SALT") || new Date().toISOString().slice(0, 10);
  const ipHash = await hmacSha256(ip, salt);
  const uaHash = await sha256(req.headers.get("user-agent") ?? "");

  await supa.from("sessions").upsert({
    id: sessionId,
    source_app: sourceApp,
    last_seen_at: new Date().toISOString(),
    user_agent_hash: uaHash,
    ip_hash: ipHash,
    referrer: body.referrer ?? null,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    language: body.language ?? null,
    device_type: body.device_type ?? null,
  }, { onConflict: "id" });

  // 2. Event einfügen
  const { error } = await supa.from("events").insert({
    session_id: sessionId,
    source_app: sourceApp,
    event_type: body.event_type,
    properties: body.properties ?? {},
    occurred_at: body.occurred_at ?? new Date().toISOString(),
  });

  if (error) return new Response(error.message, { status: 500, headers: cors });
  return new Response("ok", { headers: cors });
});

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmacSha256(msg: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
