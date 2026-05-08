#!/bin/bash
set -e

VPS_USER="root"
VPS_IP="72.60.91.67"
VPS_PATH="~/docker/website/flowstate/foundation"

echo "📦 Syncing project to VPS..."
rsync -avz --exclude node_modules --exclude dist --exclude .git \
  ./ $VPS_USER@$VPS_IP:$VPS_PATH/

echo "🐳 Rebuilding and restarting container..."
ssh $VPS_USER@$VPS_IP "cd $VPS_PATH && docker compose down && docker compose up -d --build"

echo "✅ Deployed to flowstate.foundation (port 6666)"
