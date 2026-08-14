# Frontend — Implementation Plan

**App:** `@numforlife/frontend`  
**UAT URL:** `https://uat.numforlife.com`  
**Port:** `3000`  
**Client repo:** `kccdigital/shuyifn-web-frontend`

---

## Purpose

Public marketing site, member flows, shop catalog, calculators, legal pages, and SEO.

Admin CMS is **not** served from this origin.

---

## Scope (in this app)

| Module | Routes | Status |
|--------|--------|--------|
| Homepage + CMS blocks | `/` | ✅ Built |
| About / contact / portfolio | `/about-us`, `/contact-us`, `/portfolio` | ✅ Built |
| Calculators | `/celue`, `/celue/[slug]` | ✅ Numerology; tarot pending content |
| Shop (display) | `/shop`, `/shop/[id]` | ✅ Built |
| Membership | `/membership` | ✅ Built |
| Member auth + dashboard | `/login`, `/dashboard` | ✅ Built |
| Legal | `/privacy-policy`, etc. | ✅ Built |
| SEO | `sitemap.ts`, `robots.ts`, JSON-LD | ✅ Built |

### Soon clarifications (2026-08-14)

| Calculator | Website behavior |
|------------|------------------|
| Numerology | Full in-site flow |
| Tarot | Full in-site flow (blocked: needs deck/content from client) |
| 姓名学 / 东方占卜 | **App deep link only** — update registry next |

---

## Shared dependencies (`packages/shared`)

This app imports via path aliases:

- `@/lib/*` → `packages/shared/lib/*`
- `@/components/ui/*` → shared UI primitives

**Server-side reads:** CMS published content, MySQL (read-only), PlenorHub, settings flags.

---

## Environment (`.env.production.local`)

```env
NODE_ENV=production
PORT=3000
SITE_URL=https://uat.numforlife.com
PUBLIC_HOST=uat.numforlife.com

SESSION_SECRET=
KCC_CLIENT_ID=shuyi

DB_HOST=43.156.19.185
DB_USER=
DB_PASS=
DB_NAME=app_numforlife_com

PLENORHUB_CHANNEL_KEY=
PLENORHUB_BASE_URL=https://api.plenorhub.com/api/v1
PLENORHUB_SERVER_URL=https://api.plenorhub.com

# Shared with admin on UAT server
CMS_DATABASE_PATH=/var/www/numforlife-shared/data/cms.sqlite
REDIRECTS_MANIFEST_PATH=/var/www/numforlife-shared/data/redirects.manifest.json
MEDIA_ROOT=/var/www/numforlife-shared/media
```

---

## API routes (this app only)

| Route | Purpose |
|-------|---------|
| `GET /api/health` | Liveness |
| `GET/POST/DELETE /api/member/session` | Member KCC login |

---

## Local development

```bash
# From repo root
npm install
npm run dev:frontend
# http://localhost:3000
```

Run admin in a second terminal: `npm run dev:admin`

---

## Deploy

- Build: `npm run build:frontend`
- PM2 name: `numforlife-web`
- nginx upstream: `127.0.0.1:3000`

---

## Next tasks (priority)

1. [ ] Update calculator registry — name + eastern → App links
2. [ ] Tarot calculator (after client provides content)
3. [ ] Push to `shuyifn-web-frontend` when build passes
4. [ ] UAT deploy + DNS + SSL
5. [ ] Member calc quota bypass for VIP (if in scope)

---

## Out of scope (frontend)

- Admin CMS UI
- `/api/cms/*`, `/api/admin/*`
- Production cutover

See root `CLIENT-BLOCKERS.md` for client dependencies.
