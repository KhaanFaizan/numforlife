#!/usr/bin/env bash
# UAT deploy helper — run on the Lighthouse UA instance after DNS + SSH are ready.
set -euo pipefail

ROOT_DIR="${ROOT_DIR:-/var/www/numforlife-uat}"
FRONTEND_REPO="${FRONTEND_REPO:-shuyifn-web-frontend}"
ADMIN_REPO="${ADMIN_REPO:-shuyifn-web-admin}"
SHARED_DIR="${SHARED_DIR:-/var/www/numforlife-shared}"

echo "==> Deploying NumForLife UAT (two apps) to ${ROOT_DIR}"

mkdir -p "${SHARED_DIR}/data" "${SHARED_DIR}/media" "${ROOT_DIR}/logs"

if [[ ! -d "${ROOT_DIR}/frontend/.git" ]]; then
  echo "Clone frontend and admin repos into ${ROOT_DIR} first, then re-run."
  exit 1
fi

cd "${ROOT_DIR}/frontend"
git pull
npm ci
npm run build

cd "${ROOT_DIR}/admin"
git pull
npm ci
npm run build

pm2 reload "${ROOT_DIR}/deploy/uat/ecosystem.config.cjs" --update-env || \
  pm2 start "${ROOT_DIR}/deploy/uat/ecosystem.config.cjs"

echo "==> Health checks"
curl -fsS "http://127.0.0.1:3000/api/health" | head -c 200
echo ""
curl -fsS "http://127.0.0.1:3001/api/health" | head -c 200
echo ""
echo "Done. Verify https://uat.numforlife.com and https://uat-admin.numforlife.com/admin/login"
