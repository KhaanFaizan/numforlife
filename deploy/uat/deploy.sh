#!/usr/bin/env bash
# UAT deploy helper — run on the Lighthouse instance after DNS + SSH are ready.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/numforlife-uat}"
BRANCH="${BRANCH:-feat/production-foundation}"

echo "==> Deploying NumForLife UAT to ${APP_DIR} (branch ${BRANCH})"

if [[ ! -d "${APP_DIR}/.git" ]]; then
  echo "Clone the repo to ${APP_DIR} first, then re-run."
  exit 1
fi

cd "${APP_DIR}"

git fetch origin
git checkout "${BRANCH}"
git pull origin "${BRANCH}"

npm ci
npm run build

mkdir -p logs data
pm2 reload deploy/uat/ecosystem.config.cjs --update-env || pm2 start deploy/uat/ecosystem.config.cjs

echo "==> Health check"
curl -fsS "http://127.0.0.1:3000/api/health" | head -c 200
echo ""
echo "Done. Verify https://uat.numforlife.com and https://uat-admin.numforlife.com/admin/login"
