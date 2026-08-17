# UAT redeploy runbook

Use after pushing changes to `shuyifn-web-frontend` and/or `shuyifn-web-admin`.

## Server paths

| Path | Purpose |
|------|---------|
| `/var/www/numforlife-frontend` | Public app |
| `/var/www/numforlife-admin` | Admin app |
| `/var/www/numforlife-shared/data` | CMS SQLite + redirect manifest |
| `/var/www/numforlife-shared/media` | Uploaded media |

## Shared env (both apps)

```env
CMS_DATABASE_PATH=/var/www/numforlife-shared/data/cms.sqlite
REDIRECTS_MANIFEST_PATH=/var/www/numforlife-shared/data/redirects.manifest.json
REDIRECTS_MANIFEST_PUBLIC_COPY=/var/www/numforlife-frontend/public/redirects.manifest.json
MEDIA_ROOT=/var/www/numforlife-shared/media
```

Set `REDIRECTS_MANIFEST_PUBLIC_COPY` on the **admin** app so publish updates the frontend manifest.

## Redeploy frontend

```bash
cd /var/www/numforlife-frontend
git pull
npm ci
export NEXT_DISABLE_TYPECHECK=1
npm run build
pm2 restart numforlife-web
curl -s http://127.0.0.1:3000/api/health
```

## Redeploy admin

```bash
cd /var/www/numforlife-admin
git pull
npm ci
export NEXT_DISABLE_TYPECHECK=1
npm run build
pm2 restart numforlife-admin
curl -s http://127.0.0.1:3001/api/health
```

## Smoke test

- https://uat.numforlife.com
- https://uat.numforlife.com/celue
- https://uat-admin.numforlife.com/admin/login
- Admin publish → public homepage reflects change

## SEO / sitemap verification (Tier 4)

Ensure frontend `.env.production.local` includes:

```env
SITE_URL=https://uat.numforlife.com
```

After redeploy, verify:

```bash
curl -s https://uat.numforlife.com/robots.txt
curl -s https://uat.numforlife.com/sitemap.xml | head -40
curl -sI https://uat.numforlife.com/faq | grep -i canonical
curl -sI https://uat.numforlife.com/does-not-exist | head -5
```

Expected:

- `robots.txt` references `https://uat.numforlife.com/sitemap.xml`
- `sitemap.xml` includes `/faq`, `/celue/tarot`, `/membership`, legal pages
- Public pages emit `link: canonical` pointing at `SITE_URL`
- Unknown paths return styled 404 (Chinese copy)

## Local monorepo → client publish folders

From `clientdemo` after changes:

1. Copy `frontend/*` + `packages/shared` → `shuyifn-web-frontend-publish`
2. Copy `admin/*` + `packages/shared` + `frontend/components/home|sections` → `shuyifn-web-admin-publish`
3. Test build locally in each publish folder
4. Commit + push to kccdigital repos
5. Run redeploy commands above on the server
