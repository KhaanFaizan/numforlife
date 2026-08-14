# Admin — Implementation Plan

**App:** `@numforlife/admin`  
**UAT URL:** `https://uat-admin.numforlife.com`  
**Port:** `3001`  
**Client repo:** `kccdigital/shuyifn-web-admin`

---

## Purpose

CMS, content publishing, media library, redirects, user support lookup, integrations health, feature flags, and audit logs.

Public pages are **not** served from this origin.

---

## Scope (in this app)

| Module | Route | Status |
|--------|-------|--------|
| Admin login | `/admin/login` | ✅ Built |
| Dashboard | `/admin/dashboard` | ✅ Built |
| Homepage editor | `/admin/homepage` | ✅ Built |
| Pages list | `/admin/pages` | ✅ Built |
| Preview | `/admin/preview` | ✅ Built |
| Media library | `/admin/media` | ✅ Built |
| Redirect manager | `/admin/redirects` | ✅ Built |
| User support | `/admin/users` | ✅ Built |
| Integrations + flags | `/admin/integrations` | ✅ Built |

---

## Shared dependencies (`packages/shared`)

- `@/lib/cms/*` — draft/publish/versions (SQLite)
- `@/lib/auth/*` — KCC admin login + RBAC
- `@/lib/media/*`, `@/lib/redirects/*`, `@/lib/settings/*`
- `@/components/ui/*` — shared primitives

---

## Environment (`.env.production.local`)

```env
NODE_ENV=production
PORT=3001
SITE_URL=https://uat.numforlife.com
ADMIN_HOST=uat-admin.numforlife.com

SESSION_SECRET=          # same secret as frontend on UAT
KCC_CLIENT_ID=shuyi

ADMIN_BOOTSTRAP_KCC_USER_ID=
ADMIN_BOOTSTRAP_EMAIL=admin@kccdigital.com
ADMIN_BOOTSTRAP_ROLE=super_admin

DB_HOST=43.156.19.185
DB_USER=
DB_PASS=
DB_NAME=app_numforlife_com

PLENORHUB_CHANNEL_KEY=

CMS_DATABASE_PATH=/var/www/numforlife-shared/data/cms.sqlite
REDIRECTS_MANIFEST_PATH=/var/www/numforlife-shared/data/redirects.manifest.json
MEDIA_ROOT=/var/www/numforlife-shared/media
```

---

## API routes (this app only)

| Prefix | Purpose |
|--------|---------|
| `/api/auth/session` | Admin login/logout |
| `/api/cms/*` | Draft, publish, versions, content |
| `/api/admin/*` | Media, redirects, members, audit, flags, integrations |
| `/api/health` | Liveness (`service: numforlife-admin`) |

---

## CMS → public site flow

1. Editor saves draft in admin  
2. Publish writes to **shared** SQLite (`CMS_DATABASE_PATH`)  
3. Redirect/media changes write to **shared** paths  
4. Frontend app reads published content on next request  

Both apps must use the **same shared paths** on the UAT server.

---

## Local development

```bash
npm run dev:admin
# http://localhost:3001/admin/login
```

---

## Deploy

- Build: `npm run build:admin`
- PM2 name: `numforlife-admin`
- nginx upstream: `127.0.0.1:3001`
- `X-Robots-Tag: noindex` on all responses

---

## Next tasks (priority)

1. [ ] Verify admin login after KCC password from Soon
2. [ ] Push to `shuyifn-web-admin` when build passes
3. [ ] UAT deploy on port 3001
4. [ ] Optional: nginx IP allow-list for admin vhost
5. [ ] Banner/campaign admin module (backlog)

---

## Blockers

| Item | Needed for |
|------|------------|
| KCC admin test password | Login UAT |
| Admin role assignments | RBAC demo |

See root `CLIENT-BLOCKERS.md`.
