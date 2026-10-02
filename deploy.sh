#!/bin/bash
# Deployment auf dem Hetzner-Server (läuft direkt dort, hinter dem zentralen Caddy).
set -euo pipefail
cd "$(dirname "$0")"

docker compose --env-file .env up -d --build flowstate-foundation-web
docker compose ps
echo "✅ flowstate-foundation-web läuft (Caddy: flowstate.foundation → flowstate-foundation-web:3001)"
