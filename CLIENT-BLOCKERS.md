# Client blockers — resolve before final UAT / production

Items we **cannot finish in code alone**. When all implementable work is done, send this list to the client in one request.

Last updated: 2026-08-11

---

## Infrastructure (blocks live UAT)

| # | Blocker | Needed for | Action required |
|---|---------|------------|-----------------|
| 1 | **DNS A records** for `uat.numforlife.com` and `uat-admin.numforlife.com` (Porkbun) | UAT review | Create records pointing to Lighthouse IP |
| 2 | **Tencent Lighthouse SSH / WebShell** — sub-user lacks `DescribeInstances` | Deploy, nginx, PM2, TLS | Root account grants Lighthouse access or provides SSH credentials |
| 3 | **Production admin domain** | Production admin URL | Confirm hostname (not invented yet) |

---

## Authentication & accounts

| # | Blocker | Needed for | Action required |
|---|---------|------------|-----------------|
| 4 | **KCC admin test password** for `admin@kccdigital.com` (bootstrap user) | Admin UAT login | Reset or share test credentials |
| 5 | **KCC member coverage** — only 8/51 app users have `kcc_user_id` | Member login for existing users | Choose: (a) backfill KCC IDs, (b) dual-path legacy login *(recommended)*, or (c) KCC-only |
| 6 | **Admin role assignments** beyond bootstrap super-admin | RBAC UAT | List who gets which of the 6 roles |

---

## Commerce (PlenorHub / shop)

| # | Blocker | Needed for | Action required |
|---|---------|------------|-----------------|
| 7 | **Checkout location** — web vs App vs PlenorHub | Real purchase flow | Where checkout completes |
| 8 | **Discount enforcement at payment** — 5%/10% tier discount | Shop parity | Who applies discount at payment (PlenorHub cannot today) |
| 9 | **KCC vs fiat pricing** — API returns `currency: KCC` | Correct displayed prices | Authoritative currency + fixed rate if any |
| 10 | **PlenorHub categories / variants** | Category browse, variant SKUs | Product taxonomy guidance |
| 11 | **WooCommerce legacy orders** + **$999 Lifetime VIP** | Order history migration | Retain, migrate, or archive |
| 12 | **PlenorHub key rotation** after handover | Security | Rotate channel key post-UAT |

---

## Content & product decisions

| # | Blocker | Needed for | Action required |
|---|---------|------------|-----------------|
| 13 | **Numerology PHP snippet** export from WordPress Code Snippets | Native engine port (remove WP dependency) | ~2 min export; parity suite is the gate |
| 14 | **Tarot** — no deck, meanings, or spread content | Tarot feature | Confirm scope or remain blocked |
| 15 | **使用条款 on live WP** is placeholder template text | Legal accuracy | Client legal review / replace copy (migrated as-is for now) |
| 16 | **Brand assets** — logo SVG, CJK webfont, OG images | Polish + SEO | Provide approved assets |
| 17 | **Preview-record policy** — save vs never save | Calculator records on web | Align with PRD vs current “never saved” copy |
| 18 | **Scope ruling** on app features PRD omits (导师, 万年历, ads, 档案) | Avoid scope creep | Confirm in or out |

---

## Analytics & SEO ops

| # | Blocker | Needed for | Action required |
|---|---------|------------|-----------------|
| 19 | **GA4 / Meta Pixel IDs** | Client-side analytics | Provide measurement IDs |
| 20 | **Google Search Console** access | Change-of-address, crawl monitoring | Grant property access |

---

## Sign-off

| # | Blocker | Needed for | Action required |
|---|---------|------------|-----------------|
| 21 | **UAT sign-off** | Production cutover | Client approval after periodic UAT releases |
| 22 | **Production DNS cutover plan** | Go-live | TTL reduction, backup, 30-day WP standby |

---

## Still implementable without client (internal backlog)

- ~~CMS 401 fix on public pages~~ ✅
- ~~Admin RBAC enforcement~~ ✅
- ~~Audit logs (login/logout/publish/reset/restore)~~ ✅
- ~~Redirect manager (admin UI)~~ ✅
- ~~User support lookup (read-only)~~ ✅
- ~~Media library (local uploads)~~ ✅
- ~~Integration health + feature flags~~ ✅
- Remaining admin modules (budget-scoped): banners/campaigns UI
- Native numerology port *(after #13)*
- Media migration off `wp-content` *(use Media Library to replace URLs manually)*
- Monorepo split D-002 *(optional; host routing works for UAT)*
