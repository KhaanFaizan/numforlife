# NumForLife — Monorepo

Two Next.js applications for the Shuyi / KCC Digital website revamp.

## Structure

```
clientdemo/
├── frontend/          Public site → uat.numforlife.com (:3000)
├── admin/             Admin CMS   → uat-admin.numforlife.com (:3001)
├── packages/shared/   Shared lib, auth, CMS, shop, calculators
├── deploy/uat/        PM2 + nginx examples
├── tools/             DB inspect, fixtures, scripts
└── tests/             Parity tests
```

## Quick start

```bash
npm install
npm run dev:frontend   # http://localhost:3000
npm run dev:admin      # http://localhost:3001/admin/login
npm run build          # both apps
```

Copy `.env.example` to `frontend/.env.local` and `admin/.env.local` (or one shared `.env.local` at root for dev — Next loads from each app directory).

## Client repos

| App | GitHub |
|-----|--------|
| Frontend | `kccdigital/shuyifn-web-frontend` |
| Admin | `kccdigital/shuyifn-web-admin` |

Publish subsets from this monorepo when pushing to client repos.

## Docs

- `frontend/IMPLEMENTATION-PLAN.md` — public app scope and deploy
- `admin/IMPLEMENTATION-PLAN.md` — admin app scope and deploy
- `PROJECT-KNOWLEDGE-HANDOFF.md` — full project context
- `CLIENT-BLOCKERS.md` — items needing client input
