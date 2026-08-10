# 数易赋能 / NumForLife — Technical Knowledge Document

**Living document.** Updated as decisions are made and facts are verified. This supersedes the
one-off audit of 2026-08-09 while preserving its findings.

| | |
|---|---|
| **Version** | 2.0 |
| **Last updated** | 2026-08-10 |
| **Working branch** | `feat/production-foundation` |
| **Public UAT** | `uat.numforlife.com` |
| **Admin UAT** | `uat-admin.numforlife.com` |
| **Production** | `numforlife.com` (do not deploy yet) |

### Status legend — used on every claim in this document

| Tag | Meaning |
|---|---|
| 📋 **PRD** | Stated in the PRD |
| ✅ **CONFIRMED** | Explicitly confirmed by the client (Soon) |
| 🔬 **VERIFIED** | Proven by inspecting live code/systems — evidence in §11 |
| 🏛 **DECISION** | Architectural decision taken; see Decision Log §12 |
| 💡 **RECOMMENDATION** | Our proposal, not yet ratified |
| ⏳ **PENDING** | Awaiting verification; access or data not yet available to us |
| 🔴 **BLOCKER** | Genuinely blocks work |

> **Note on sourcing:** Soon's first full reply was relayed to us in paraphrase, not verbatim.
> Items marked ✅ CONFIRMED below reflect that paraphrase. If his exact wording differs on any
> point, correct this document — the Decision Log records what we acted on and why.

---

# 1. Executive Summary — what changed in v2

Six previously-blocking items are now resolved, three by client answers and **three by our own
investigation** rather than by asking:

| Was blocking (v1) | Now | How |
|---|---|---|
| KCC `numforlife` client not registered | ✅ **RESOLVED** | 🔬 Probed KCC: `shuyi` client **is registered and works**; and the flow is **non-redirect**, so no callback URLs need registering for either UAT domain |
| Membership discount rules unknown | ✅ **RESOLVED** | 🔬 Rule found in production *and* confirmed in the DB: `商城优惠` = **0% / 5% / 10%** |
| Numerology algorithm at risk | ✅ **DE-RISKED** | 🔬 12 golden-master fixtures captured **and** cross-validated against the app's stored JSON result format |
| Database access | ✅ **RESOLVED** | 🔬 Credentials supplied 08-10; **connected read-only, 68 tables mapped** (§7) |
| WooCommerce vs PlenorHub | ✅ **RESOLVED** | Client: full replacement by PlenorHub |
| Calculation API existence | ✅ **RESOLVED** | Client: none exists — port it |
| Energy points / credits API missing | ✅ **RESOLVED** | 🔬 Found in DB: `yzn_member.coins` + `yzn_coin_log` (§7.3) |

## ⚠️ One new risk found by inspecting the database

Soon states that users registered in the app can log into both app and website via KCC ID.
🔬 **The data does not fully support this: only 8 of 51 members (16%) have a `kcc_user_id`.**
The remaining 43 have no KCC identity, so a KCC-only login would leave them unable to sign in.
This is the single most important thing to resolve before auth is built — see §6.4 and §13 VA-1.

**Still genuinely blocked:** Tarot deck/interpretation content, server SSH credentials, PlenorHub
catalog content. See §13.

---

# 2. Client Clarifications Incorporated (2026-08-10)

| # | Clarification | Status | Impact |
|---|---|---|---|
| C1 | UAT split into **two** entry points: `uat.numforlife.com` (public) + `uat-admin.numforlife.com` (admin) | ✅ CONFIRMED | Drives the two-app architecture (§5) and the monorepo decision D-002 |
| C2 | Database access provided; may be used to build the user dashboard | ✅ CONFIRMED | Data layer design §7; **read-only preserved** |
| C3 | Existing app users must log into **both** app and website | ✅ CONFIRMED | Reframes auth: identity must resolve to existing app users (§6) |
| C4 | **No calculation API exists**; port the WordPress calculator | ✅ CONFIRMED | §8 — fixtures captured, port specified |
| C5 | Tarot exists in the mobile app; use it as the reference | ✅ CONFIRMED | §9 — source still not supplied 🔴 |
| C6 | WooCommerce **fully replaced** by PlenorHub | ✅ CONFIRMED | §10 — migration/redirect map |
| C7 | **Different discounts apply per membership tier** | ✅ CONFIRMED | 🔬 Rule located in production (§10.2) |
| C8 | `manutd.com` as UX reference for the dashboard | ✅ CONFIRMED | §7.4 — patterns only, no assets/branding |
| C9 | Demo remains the baseline | ✅ CONFIRMED | §4 continuation strategy unchanged |

---

# 3. Current System (verified facts carried forward)

## 3.1 WordPress — 🔬 VERIFIED
`hello-elementor` + Elementor Pro + WooCommerce (+ Payments, PayPal), `easy-login-woocommerce`
(site-local accounts), `dark-mode-toggle`, and **`code-snippets`** — which is where the numerology
PHP lives. 21 indexed pages plus product URLs and a `product_cat` taxonomy (full table in §10.3).

## 3.2 The real PHP backend — 🔬 VERIFIED
`https://app.numforlife.com/api/…`, **ThinkPHP 5** (path leaked via a 500:
`/www/wwwroot/app.numforlife.com-new/`). Serves a **uni-app/Vue H5** build at `/h5/`.
Envelope `{code, msg, time, data}` — `code:1` ok, `code:0` business error, `code:500` fatal.
**Auth = `token` + `userid` in the POST body**, from local storage. No `Authorization` header,
no KCC JWT. 42 routes extracted; one (`getMemberInfo`) is already dead server-side, so the
bundle is stale and every route must be re-validated before use.

**Not documented in any of the four PDFs supplied.** This remains the largest documentation gap.

## 3.3 Membership model — 🔬 VERIFIED (live)
Three tiers: `base_vip` (基础) / `elitist_vip` (精英) / `supreme_vip` (至尊).
`POST /api/apis/getVipPurview` is **public** and returns the full entitlement matrix:

| id | 权限 | 基础 | 精英 | 至尊 | Website use |
|---|---|---|---|---|---|
| 1 | 广告 | 有 (1) | 无 (0) | 无 (0) | Ad slots (ties to `getAdsList.vip_show`) |
| 2 | 一次性赠品 | 无权 (−2) | 注册有礼* (1) | 注册有礼* (1) | Membership page |
| 3 | 主性格 | 无限制 (999) | 无限制 (999) | 无限制 (999) | **Free on web** |
| 4 | 五行总览 | 无限制 (999) | 无限制 (999) | 无限制 (999) | **Free on web** |
| 5 | 81组数字 | 首十个 (10) | 无限制 (999) | 无限制 (999) | **Gates the result page** |
| 6 | 测算记录 | 首十个 (10) | 无限制 (999) | 无限制 (999) | **Gates 测算记录** — matches PRD "partial records" exactly |
| 9 | 免费一对一年度咨询 | 无权 (−2) | 无权 (−2) | 有权* (1) | Membership page |
| 11 | 超级用户体验 | 无权 (−2) | 无权 (−2) | 有权* (1) | Membership page |
| **17** | **商城优惠\*\*** | **0%** | **5%** | **10%** | **The membership discount (§10.2)** |

Value semantics: `999` = unlimited, `10` = first ten only, `−2` = no entitlement, `1` = granted.

🏛 **DECISION D-006:** the membership page and every gating rule read this endpoint at runtime.
No tier benefits are hardcoded — this satisfies PRD §8.6 ("must not hardcode membership rules")
and means marketing copy changes on the app side flow through automatically.

## 3.4 Demo baseline — 🔬 VERIFIED
Next.js 16.3.0 / React 19.2.8 / Tailwind v4 / framer-motion 13 / @dnd-kit. ~2,900 lines.
Strengths: approved visuals, working dnd block reorder, coherent motion system.
Production gaps: localStorage CMS, fake login, dark-only theme, no SEO, **fully client-rendered**
(the homepage gates on `isHydrated` → nothing crawlable), images hot-linked from `wp-content`.

---

# 4. Demo Continuation Strategy — unchanged, still valid

**Reuse as-is:** `lib/animations.ts`, `lib/motion.ts`, `components/ui/*`, all `sections/*` markup
and animation, `admin/BlockEditor.tsx` (dnd-kit), `admin/ui/*`, `lib/utils.ts`.
**Refactor:** sections → typed props + server-rendered; `globals.css` → full light/dark token set;
`HomePageRenderer` → server block renderer; `BlockForms` → schema-driven.
**Replace:** localStorage CMS → DB-backed; fake login → real auth; hardcoded content → CMS seed;
hot-linked images → own media origin.
**Delete:** `temp-home.html` (365 KB scrape artifact) and the five one-off `scripts/*.mjs`.

---

# 5. Application & Deployment Architecture (C1)

## 5.1 Two entry points, one codebase — 🏛 DECISION D-002

```
                     ┌───────────────────────────────┐
   uat.numforlife.com├─► nginx vhost ─► :3000  apps/web    (public, indexed)
                     └───────────────────────────────┘
                     ┌───────────────────────────────┐
uat-admin.numforlife ├─► nginx vhost ─► :3001  apps/admin  (noindex + IP allow-list)
        .com         └───────────────────────────────┘
                                  │
                     packages/{ui,types,api,config,db}
```

**Why two apps rather than route groups on one origin:** separate domains with different security
postures. The admin origin can be IP-restricted and `noindex`ed at the nginx layer, and the admin
bundle is never served from the public origin at all — which satisfies PRD §17 ("keep admin
separate from the public website bundle") structurally rather than by convention. Two PM2
processes also mean an admin deploy cannot take the public site down.

**Cost of the migration is real but bounded:** npm workspaces, no build-tool change, shared
components move to `packages/ui` once.

## 5.2 Target structure

```
apps/
  web/      Next.js — public site (SSR/ISR, indexed)
  admin/    Next.js — CMS + admin (SPA-ish, noindex)
packages/
  ui/       design system + shared components (from demo)
  types/    shared TS contracts (CMS blocks, API DTOs, entitlements)
  api/      server-only clients: appApi, kccid, plenorhub, db
  config/   tailwind preset, eslint, tsconfig bases
tests/fixtures/numerology/   golden-master baseline  ← CAPTURED ✅
tools/calc-capture/          fixture harness         ← BUILT ✅
```

## 5.3 Production equivalent — 💡 planned, **not deployed**
`numforlife.com` → :3000, `admin.numforlife.com` → :3001, same pattern, separate DB schema,
separate PM2 namespace. **No production changes will be made until UAT is signed off.**

---

# 6. KCC ID Authentication — largely RESOLVED by investigation

## 6.1 What we proved — 🔬 VERIFIED (evidence §11.2)

We probed `POST /kccid/v1/authorize` with deliberately invalid credentials to distinguish
*client rejection* from *credential rejection*:

| client_id | HTTP | Response | Meaning |
|---|---|---|---|
| `numforlife` | 401 | `invalid_client` — "The client is not allowed." | **Not registered** |
| `shuyi` | 401 | `invalid_grant` — "The provided credentials are invalid." | **Registered and accepted** — request passed client validation and failed only at credentials |

🏛 **DECISION D-003: use `client_id = shuyi`.** No new client registration is required.
This closes v1's BLOCKING-5.

## 6.2 Callback URLs are a non-issue — 🔬 VERIFIED

The KCC guide (§4) states `/kccid/v1/authorize` is a **non-redirect credential-to-authorization-code**
endpoint: our server POSTs identifier + password + PKCE challenge and receives a `code` in the
response body. There is **no browser redirect and therefore no redirect URI to register**.

➡️ **Both `uat.numforlife.com` and `uat-admin.numforlife.com` work with the existing registration
with zero KCC-side configuration.** This directly answers the question posed in the brief.

## 6.3 The flow we will implement

```
Browser → POST /api/auth/login (our server, apps/web)
   1. generate PKCE verifier+challenge (S256), hold verifier server-side
   2. POST auth.bigkpay.com/kccid/v1/authorize {identifier,password,client_id:shuyi,scope,challenge}
   3. POST /kccid/v1/token {grant_type:authorization_code, code, client_id, code_verifier}
   4. store tokens in an ENCRYPTED httpOnly cookie — never exposed to JS
   5. refresh when <5 min remain; honour token_version 401 by forcing logout
```
Scopes `openid profile email`. Rate limit is 5/min per IP on `/authorize` — surface a friendly
429 message. Admin auth uses the same flow, then maps the KCC `sub` to our `admin_users` row for
role resolution (KCC does not store our roles).

## 6.4 KCC coverage gap — 🔬 VERIFIED, needs a client decision

C3 says app-registered users can log into both app and website via KCC ID. The database shows
this is **only partially true today**:

```sql
SELECT COUNT(*) total,
       SUM(kcc_user_id IS NOT NULL AND kcc_user_id<>'') has_kcc
  FROM yzn_member;
-- total = 51, has_kcc = 8
```

| Metric | Value |
|---|---|
| Total members | **51** |
| With `kcc_user_id` | **8** (16%) |
| With `mall_bound = 1` | **8** (the same cohort) |
| With `bigk_wallet_id` | **0** |

The schema is clearly *designed* for KCC (`yzn_member.kcc_user_id`, `mall_client_id`,
`mall_wallet_id`, `mall_bound`), but only a recent cohort is linked. The other 43 members
authenticate purely through the legacy `yzn_member.password` + `yzn_member_token` mechanism.

**Consequence:** a KCC-only login excludes 84% of the existing user base on day one.

Three possible resolutions — **the client must choose, we should not decide this unilaterally**:
- **(a) Backfill/provision** the 43 unlinked members into KCC ID before launch (cleanest).
- **(b) Dual-path login:** try KCC first, fall back to the legacy credential check, and link the
  KCC id on first successful login (progressive migration — lowest user friction).
- **(c) KCC-only,** accepting that unlinked users must re-register.

💡 **RECOMMENDATION: (b).** It honours C3 literally, requires no big-bang migration, and
progressively populates `kcc_user_id` as users return. 🏛 D-004's provider interface already
supports it. Logged as VA-1 in §13.

---

# 7. Database & User Dashboard

## 7.1 Security architecture — 🏛 DECISION D-005 (non-negotiable)

```
Browser  ──►  Next.js Route Handlers (server-only)  ──►  MySQL (read-only user)
   ▲                     │                          ──►  app.numforlife.com API
   └── httpOnly cookie ──┘                          ──►  auth.bigkpay.com / PlenorHub
        no DB creds, no API keys, no channel keys ever reach the browser
```

- DB credentials live only in server-side env vars, never in `NEXT_PUBLIC_*`, never in a client
  component, never in the repo.
- The provided account is **read-only and stays read-only.**
- Anything the website *writes* (CMS, admin, audit, website preview records) goes to a **separate
  schema** (`numforlife_web`), never into `app_numforlife_com`.

## 7.2 Direct DB vs API — reconciling C2 with the PRD

| | PRD §5.4/§18 + job post | Client C2 |
|---|---|---|
| Says | frontend must **never** connect directly to the DB | DB access provided, use it for the dashboard |

**These are compatible, and the distinction matters.** "Frontend" means the *browser*. A
server-side read from a Next.js Route Handler is not the browser. So:

🏛 **DECISION D-005:** dashboard reads go through a **server-side data layer** in `packages/api`.
Where a documented app API endpoint exists we prefer it (single source of business logic); where
none exists we read the DB directly **server-side, read-only**. This honours C2 and the PRD's
actual security intent simultaneously. Documented as an intentional divergence from a literal
reading of PRD §5.4.

## 7.3 Data map — 🔬 VERIFIED 2026-08-10

**Connection:** MySQL **5.7.40** on `43.156.19.185:3306`, database `app_numforlife_com`,
using the client-supplied **read-only** account (credentials held outside the repo, in env vars
only — see `tools/db-inspect/README.md`). Port 3306 is directly reachable, so tooling connects
with a real MySQL client rather than scraping phpMyAdmin. **68 tables.**

Inspection tooling: `tools/db-inspect/` (credentials read from env vars only — never committed).

### Core map: table → columns → website feature

| Table | Rows | Key columns | Consumed by |
|---|---|---|---|
| **`yzn_member`** | 51 | `id`, `username`, `nickname`, `email`, `mobile`, `avatar`, `sex`, `birth_time`, `year/month/day`, `twin_status`, `parent_year/month/day`, `real_name` | Dashboard profile; **pre-fills the calculator** |
| ″ (identity) | | `kcc_user_id`, `mall_client_id`, `mall_wallet_id`, `mall_bound`, `bigk_wallet_id`, `token` | Auth + KCC mapping (§6.4) |
| ″ (membership) | | `vip_level_id`, `vip_subscription_start`, `vip_subscription_end` *(NULL = lifetime)*, `vip_time`, `vip_price`, `overduedate`, `is_super`, `super_type` | Membership status, tier gating, discount tier |
| ″ (credits) | | **`coins`** (KCC Coin balance), `point`, `amount` | **Energy points card** — previously thought missing |
| **`yzn_vip_levels`** | 3 | `id`, `name` = 基础会员 / 精英会员 / 至尊会员 | Tier naming |
| **`yzn_vip_fee`** | 3 | `month_fee`, `year_fee`, `three_year_fee`, `five_year_fee`, `lifetime_fee`, `*_gift_coins`, `*_recommended`, `*_info` | **Membership pricing table** |
| **`yzn_vip_purview`** | 9 | `purview_name`, `base/elitist/supreme_vip_key` + `_value` | Benefit comparison + **all gating** + **discount (row 17)** |
| `yzn_vip_purview_user_use_info` | 103 | per-user entitlement consumption | Quota display |
| **`yzn_records`** | 1001 | `userid`, `records_type` (0 数字 / 1 姓名 / 2), `type` (−1 正常 / 0 流年 / 1 流月 / 2 流日), `tarot_type`, `year/month/day`, `result`, `result0..result7`, `status` | **测算记录 / dashboard history** |
| `yzn_qimen_records` | 44 | 吉时出行 records | History (out of PRD scope — flag) |
| `yzn_order` / `yzn_order_log` | 199 / 42 | membership & purchase orders | Dashboard order history |
| `yzn_shop_order` | 4 | 商城订单 | Shop history (PlenorHub migration) |
| `yzn_coin_log` / `yzn_coin_config` | 134 / 7 | coin movements by `type` | Energy-point history |
| `yzn_member_token` | 44 | `token`, `user_id`, `expire_time` | Legacy session validation |
| `yzn_tutor` (+ apply/material) | 3 | mentor profiles | 导师 page (not in PRD — §13) |
| `yzn_ads` | 3 | `position`, `image_url`, `vip_show` | Banner slots (`vip_show` ties to the 广告 entitlement) |
| `yzn_daily_data` | 404 | 万年历 | Daily content widget |
| `yzn_achievement_definition` / `yzn_user_achievement` | 33 / 33 | gamification | Not in PRD |
| `yzn_task_definition` / `yzn_user_task_progress` | 27 / 0 | tasks | Not in PRD |
| `yzn_phase3_event` | 94 | event telemetry | Existing analytics — reuse? |

### Membership distribution (live)
基础 **40** · 精英 **6** · 至尊 **5**. Pricing: Elite $4.99/mo → $34.99/5yr (+50–130 gift coins);
Supreme $12.99/mo → $89.99/5yr (+120–320 gift coins). Lifetime rows exist but are `0.00`.
⚠️ Note the WooCommerce shop sells a **$999 lifetime VIP** that has no counterpart here.

### Credits
43 of 51 members hold coins (max 1055, mean 44.5). `yzn_coin_log.type` values observed: 3, 4, 8, 9
— the type→label mapping lives in `yzn_coin_config` and must be read, not guessed.

### Stored result format — cross-validates our fixtures 🔬
`yzn_records.result` is **JSON** (769/821 numerology rows JSON-encoded; older rows use a legacy
format — the port must tolerate both). Schema:

```
wuxing.p1..p8, wuxing.main_number, wuxing.secondary_number,
wuxing.left1..left3, wuxing.right1..right3,
mainwx (number), mainwxx (string), fullOrder (array[5]), list (array[16])
```

**`fullOrder` is an array of 5** — independent confirmation of the rotating five-element order we
discovered from the web calculator (§8.3). Two systems, same finding.

🏛 **DECISION D-010:** the ported calculator emits **this** JSON shape, so website results are
structurally identical to app results and could later be written to `yzn_records` if the client
ever wants website previews to appear in the app.

### Privacy discipline
All inspection used aggregates, schema metadata and one field-shape sample. **No personal data
(emails, phones, password hashes, names, birth dates) was extracted, logged or committed**, and
none will be. `yzn_member.password`/`encrypt` are never read.

## 7.4 Dashboard UX — manutd.com reference (C8)
Patterns to adapt: a compact identity header, card-grid information hierarchy, clear primary/
secondary navigation split, and a mobile layout that collapses to a stacked card list with a
sticky section nav. **No Manchester United branding, assets, copy or code** — patterns only,
rendered in the approved 数易 visual identity.

---

# 8. Numerology — ✅ RESOLVED and DE-RISKED

## 8.1 Behavioural source of truth — 🔬 VERIFIED

`/member-number-simulate/` — a self-POSTing PHP form (Code Snippets plugin) rendering three tabs.

**Inputs:** `date`; `twin` (y/n); `big` (big/small, when twin=y); `f-date` (when big); `m-date`
(when small); mode buttons `countbtn` (普通) / `type_day` (流日) / `type_month` (流月) /
`type_year` (流年); hidden `check_day_calculate`, `check_fm_day_calculate`.

**Outputs:** SVG number pyramid + 3 stars + date decomposition + six derived digits;
a five-column table; `N号人`; and 12 analysis groups.

## 8.2 Golden-master fixtures — ✅ CAPTURED (this session)

`tests/fixtures/numerology/production-baseline.json` — **12 fixtures, all successful**, captured
from live production before any porting begins. Harness: `tools/calc-capture/capture.mjs`
(read-only, 1.5 s politeness delay, re-runnable).

Coverage: 7 base dates (incl. leap day, year boundaries, single-digit month/day), twin-big with
father's DOB, twin-small with mother's DOB, and all three alternate modes.

Each fixture records: input, HTTP status, timestamp, pyramid text nodes **with x/y coordinates**,
the element table, `personalityNumber`, all analysis groups with their `data-target` panel ids,
and gating signals.

## 8.3 Two findings that would have caused silent porting bugs — 🔬 VERIFIED

**(1) The five-element order rotates per birth date.** It is *not* a fixed 木火土金水 count list —
it is a positional mapping onto the five categories (自身性格 / 子女财富 / 事业伴侣 / 官鬼疾病 /
父母贵人). Four distinct rotations observed:

| Rotation | Example input | Values |
|---|---|---|
| 木火土金水 | 1990-05-12 | 4, 4, 1, 5, 2 |
| 火土金水木 | 1999-12-31 | 4, 0, 6, 3, 3 |
| 金水木火土 | 2004-02-29 | 5, 4, 3, 3, 1 |
| 水木火土金 | 2015-09-21 | 2, 2, 4, 2, 6 |

A port that assumed a fixed order would produce plausible-looking but wrong output for most dates.

**(2) Group count varies by mode:** 普通/流日 → 12 groups; 流月 → 10; 流年 → 6. The section is
labelled "13组解析" but renders **12** buttons (the twelfth being 隐藏号). Do not "fix" this —
reproduce it.

Groups observed: 父基因, 母基因, 人生过程（父）, 人生过程（母）, 子女下属, 近邻, 远亲,
当下朋友/事业, 人生过程（1）, 人生过程（2）, 未来财富/健康/子女, 隐藏号.

## 8.4 Porting approach — 🏛 DECISION D-007

1. Fixtures first ✅ done.
2. Port the algorithm into a **server-only** module (`packages/api/numerology`), executed in a
   Route Handler. **Never shipped to browser JS** — the formulas are business IP (PRD §9).
3. A regression test asserts every fixture byte-for-byte on the structured fields.
4. Gate the result using the real entitlement matrix (§3.3): 主性格 + 五行 free; 81组数字 and
   测算记录 limited to the first 10 for base tier.
5. Reproduce behaviour exactly — **no "improvements" to any formula.**

⚠️ **Residual risk:** fixtures capture *behaviour*, not the *formulas*. Inputs outside the captured
matrix could still diverge. Obtaining the actual PHP snippet (a 2-minute export from the
Code Snippets plugin) removes this risk entirely and is listed as VERIFIED-ACTION-2 in §13.

---

# 9. Tarot Lite — 🔴 STILL BLOCKED

✅ C5 confirms tarot lives in the mobile app and is the reference. But:

🔬 **VERIFIED:** the H5 build at `app.numforlife.com/h5/` contains **zero tarot routes** across
both JS bundles (1.07 MB inspected). No tarot endpoint exists in the 42-route API surface. The
`/tarot/` WordPress page is marketing copy only. `getRutorList` is **mentors (导师)**, not tarot.

📋 The PRD says the tarot app is **Flutter**; 🔬 what is actually deployed on the web is
**uni-app/Vue**. So the tarot implementation is presumably in a separate native/Flutter codebase
we have not been given.

## 9.1 What the database told us — 🔬 the blocker is now much narrower

`yzn_records.tarot_type` is a documented enum. **The eight spreads are therefore known:**

| Spread | Chinese/meaning |
|---|---|
| `free` | free draw |
| `daily` | daily card (每日一张牌 — matches the `/tarot/` page's tagline) |
| `love` | love |
| `one_card` | single card |
| `yes_no` | yes/no |
| `celtic_cross` | Celtic Cross |
| `tree_of_life` | Tree of Life |
| `year_ahead` | year ahead |

Usage today: 5 records, all `daily` — tarot is live but lightly used, and results are stored in
the **same `yzn_records` table** as numerology (so history/records plumbing is shared).

**Still missing, and genuinely not derivable:**
- 🔬 **No tarot deck, card or meaning tables exist anywhere in the 68-table schema** (verified by
  searching for `%tarot%`, `%card%`, `%deck%`). The deck art and interpretation text live in the
  app binary.
- Card images, upright/reversed copy, per-spread position meanings, preview-depth limits, and
  how a reading is generated (client-random vs server-authoritative).

➡️ **Revised status:** we can now build the *flow, spreads, records plumbing and result storage*.
We cannot produce the *deck or interpretations*. Per the brief — "do not invent missing Tarot
behaviour" — those remain blocked on the app source (§13 B-1). Everything else proceeds.

---

# 10. WooCommerce → PlenorHub (C6, C7)

## 10.1 Channel status — 🔬 RE-VERIFIED 2026-08-10 07:27 UTC

| Endpoint | HTTP | Result |
|---|---|---|
| `/integration/products?per_page=100` | 200 | `total: 0`, `channel: "numforlife"` |
| `/integration/merchants` | 200 | `total: 0` |
| `/integration/categories` | 200 | `[]` |

The key **authenticates correctly** (the response echoes our channel). The catalog is simply
empty. Control: the `bigk` channel returns 26 products, proving the call is correct.
Client-ready evidence in §11.1.

## 10.2 Membership discount — ✅ RESOLVED, source of truth located 🔬

**The discount is a Shuyi-side rule, not a PlenorHub feature.**

- Rule: `getVipPurview` id 17 `商城优惠` → 基础 **0%**, 精英 **5%**, 至尊 **10%**.
- PlenorHub returns **list prices only** (verified on `bigk`: `price`, `currency: KCC`). Its only
  discount mechanism is the **KCC-coin wallet discount** (`apply_kcc_discount`, `kcc_amount`,
  `can_apply_discount`) — a different concept, tied to a BigK wallet balance, **not** to Shuyi
  membership tier.
- ➡️ Therefore the tier discount must be applied by **our** layer for display, computed
  server-side as `displayPrice = listPrice × (1 − tierPct/100)` with `tierPct` read live from the
  entitlement matrix.

⚠️ **Gap we must not paper over:** PlenorHub's checkout (`/checkout/*`, `/app/orders`) has **no
field** for a channel/membership discount. If a user checks out inside PlenorHub, the 5%/10%
would **not** be applied there. Where checkout happens, and who enforces the discount at payment
time, is unresolved — see §13 VERIFIED-ACTION-3. We will not invent a rule.

🏛 **DECISION D-008:** build the product UI now against the `bigk` sample catalog behind a channel
adapter, with the tier-discount calculation implemented and unit-tested. Switching to `numforlife`
is then a single env-var change once products are published.

## 10.3 Redirect map — WooCommerce → new site

| Old URL | New | Code |
|---|---|---|
| `/shopping/` | `/shop` (PlenorHub) | 301 |
| `/product/*` | `/shop/[slug]` or `/shop` if unmapped | 301 |
| `/product-category/*` | `/shop?category=` | 301 |
| `/cart/`, `/checkout/` | `/shop` (or PlenorHub deep link) | 301 |
| `/my-account/`, `/view-order/` | `/dashboard` | 301 |
| `/sign-up/` | `/login` | 301 |
| `/member-number-simulate/` | `/celue/number` | 301 |
| `/number/`, `/name/`, `/tarot/`, `/eastern-divination/` | matching landing pages | 301 |
| `/使用条款/` (percent-encoded) | `/legal/terms` | 301 |
| `/privacy-policy/`, `/refund-policy/`, `/shipping-policy/`, `/accessibility-statement/` | `/legal/*` | 301 |
| `/portfolio/`, `/about-us/`, `/contact-us/` | `/celue`, `/about`, `/contact` | 301 |

⚠️ Existing WooCommerce **orders and customer accounts** have no destination in the new system.
Flagged as VERIFIED-ACTION-4 — a data-retention question, not a technical one.

---

# 11. Evidence Appendix (safe to share — no secrets)

## 11.1 PlenorHub `numforlife` channel — for sending to Soon

```
Timestamp : 2026-08-10 07:27:35 UTC
Endpoint  : GET https://api.plenorhub.com/api/v1/integration/products?per_page=100
Auth      : Bearer <numforlife channel key>   [redacted]
HTTP      : 200 OK   (0.87s)
Response  : {"data":[],"meta":{"total":0,"page":1,"per_page":100,"last_page":1,
                                "channel":"numforlife"}}

GET /integration/merchants   -> 200  {"data":[],"meta":{"total":0,...,"channel":"numforlife"}}
GET /integration/categories  -> 200  {"data":[]}

Control (proves our request is correct):
GET /integration/products (bigk channel) -> 200, meta.total = 26
```
**Interpretation:** authentication succeeds and the response confirms the channel is `numforlife`.
Zero products are published to it. This is a catalog-content issue on the PlenorHub side, not an
integration fault.

## 11.2 KCC ID client registration probe

```
POST https://auth.bigkpay.com/kccid/v1/authorize   (deliberately invalid credentials)

client_id=numforlife -> 401 {"error":"invalid_client","error_description":"The client is not allowed."}
client_id=shuyi      -> 401 {"error":"invalid_grant","error_description":"The provided credentials are invalid."}
```
`invalid_grant` proves `shuyi` passed client validation. `invalid_client` proves `numforlife`
is unregistered. No account was accessed; both requests used a non-existent identifier.

## 11.3 Numerology capture
12/12 fixtures, all with `personalityNumber`, an element table, and analysis groups.
Command: `node tools/calc-capture/capture.mjs`.

---

# 12. Decision Log

| ID | Date | Decision | Source | Reason | Architectural impact | Status |
|---|---|---|---|---|---|---|
| D-001 | 08-09 | Custom block CMS + custom admin; no Builder.io/Plasmic/Directus | Job post ("avoid recurring fees / lock-in") + our analysis | Only ~3 of 18 admin modules are CMS; SaaS adds a fee and a second auth model while leaving 15 modules to build anyway | We own the CMS schema and editor | ✅ Active |
| D-002 | 08-10 | Two Next.js apps (`apps/web`, `apps/admin`) in an npm-workspaces monorepo | C1 (two UAT domains) | Separate origins allow nginx-level IP restriction + `noindex` for admin; admin bundle never served publicly (PRD §17); independent deploys | Repo restructure; shared code to `packages/*` | ✅ Accepted |
| D-003 | 08-10 | Use KCC `client_id = shuyi`; do **not** request a `numforlife` client | 🔬 §11.2 | `shuyi` is registered and accepted; `numforlife` is not | Removes a blocker; no KCC-side config needed | ✅ Verified |
| D-004 | 08-10 | Auth behind a provider interface (KCC ⇄ app-backend) | C3 + 🔬 §6.4 | Unknown whether app users exist in KCC; interface avoids rework either way | `packages/api/auth` with two adapters | ✅ Accepted |
| D-005 | 08-10 | Server-side read-only data layer; browser never touches DB | C2 + PRD §5.4/§18 | Reconciles "use the database" with "frontend must never connect directly" — the browser is the frontend, the Route Handler is not | All DB access in `packages/api`; separate write schema | ✅ Accepted |
| D-006 | 08-10 | Membership benefits/gating read live from `getVipPurview`; nothing hardcoded | 🔬 §3.3 + PRD §8.6 | Real entitlement matrix already exists in production | Membership page + all gating are data-driven | ✅ Accepted |
| D-007 | 08-10 | Capture golden-master fixtures **before** porting; port server-only; reproduce exactly | C4 | Algorithm exists only in WordPress; behaviour must survive migration verbatim | `tests/fixtures/numerology` + server-only module | ✅ Done (capture) |
| D-008 | 08-10 | Build product UI against `bigk` sample data behind a channel adapter | C6 + 🔬 §10.1 | `numforlife` catalog is empty; must not block UI work | Channel is one env var | ✅ Accepted |
| D-009 | 08-10 | Tier discount computed server-side from entitlement matrix; PlenorHub prices treated as list prices | C7 + 🔬 §10.2 | PlenorHub has no membership-discount concept; its discount is KCC-wallet based | Pricing helper in `packages/api` | ⚠️ Partial — checkout enforcement unresolved |
| D-010 | 08-10 | Ported calculator emits the **app's existing `yzn_records.result` JSON shape** (`wuxing.*`, `mainwx`, `mainwxx`, `fullOrder[5]`, `list[16]`) | 🔬 §7.3 | Keeps website and app results structurally identical; allows website previews to be written into `yzn_records` later without a schema change | Numerology module output contract fixed | ✅ Accepted |
| D-011 | 08-10 | DB inspection tooling isolated in `tools/db-inspect` with its own `package.json`; credentials via env vars only | C2 + security | Keeps `mysql2` out of the app's dependency tree and guarantees no credential ever enters the repo or a client bundle | Tooling separate from `apps/*` | ✅ Active |
| D-012 | 08-10 | Membership pricing/benefits read from `yzn_vip_fee` + `yzn_vip_levels` + `yzn_vip_purview`, never hardcoded | 🔬 §7.3 | Real pricing already exists (Elite $4.99–34.99, Supreme $12.99–89.99, incl. gift coins) | Membership page fully data-driven | ✅ Accepted |

**Contradictions resolved, not deleted:**
- *"Use the app database" vs "never connect to the DB directly"* → D-005 (browser ≠ server).
- *PRD "Flutter tarot" vs deployed uni-app/Vue* → unresolved; documented §9, blocked.
- *PRD "KCC ID is identity truth" vs app's own token auth* → D-004 pending one test login.
- *Site says results are never saved vs PRD wants saved records* → still open, §13 NON-BLOCKING.

---

# 13. Blocker Reclassification

## ✅ RESOLVED
1. **KCC client registration** — `shuyi` works; non-redirect flow means no callback URLs needed (D-003).
2. **Calculation API existence** — confirmed none; port path defined and fixtures captured (D-007).
3. **WooCommerce vs PlenorHub** — full replacement (C6); redirect map drafted §10.3.
4. **Membership discount rules** — located in production data: 0/5/10% (§10.2).
5. **DB usage permission** — granted (C2); architecture defined (D-005).
6. **UAT domain architecture** — two entry points confirmed (C1); architecture defined (D-002).

## 🟠 VERIFIED — ACTION REQUIRED (small, specific, unblocks a lot)
| # | Action | Why | Effort |
|---|---|---|---|
| **VA-1** | **Decide the KCC coverage strategy** — (a) backfill 43 members into KCC, (b) dual-path login with progressive linking *(recommended)*, or (c) KCC-only | 🔬 Only **8 of 51** members have `kcc_user_id`; KCC-only login locks out 84% of existing users (§6.4) | decision |
| VA-2 | **Export the numerology PHP snippet** (Code Snippets → export) | Removes residual porting risk beyond the captured matrix; guarantees formula parity | 2 min |
| VA-3 | **Confirm where product checkout happens** and who applies the 5%/10% at payment time | PlenorHub checkout has no membership-discount field (§10.2) | decision |
| VA-4 | **Decide the fate of existing WooCommerce orders/customers** and the **$999 lifetime VIP** SKU, which has no counterpart in `yzn_vip_fee` (lifetime rows are `0.00`) | No destination in the new architecture | decision |

## 🔴 STILL BLOCKED
| # | Blocker | Blocks | Evidence it is genuinely missing |
|---|---|---|---|
| B-1 | **Tarot deck assets + interpretation content** (card images, upright/reversed copy, per-spread position meanings, preview depth, and whether readings are server-generated) | Tarot Lite result content only — flow/spreads/storage now unblocked (§9.1) | 🔬 Zero tarot routes in either H5 bundle; none in 42 API routes; **no tarot/card/deck table in any of the 68 DB tables** |
| B-2 | ~~Database credentials~~ | — | ✅ **RESOLVED 08-10** — connected read-only, 68 tables mapped (§7.3) |
| B-3 | **SSH/deployment credentials** for the Lighthouse instances + **DNS** for `uat.numforlife.com` and `uat-admin.numforlife.com` | All UAT deployment | Soon states UAT access is granted, but no SSH/console login has reached us and 🔬 neither UAT hostname resolves. Likely a transmission gap rather than a permissions one |
| B-4 | **Products published to the PlenorHub `numforlife` channel** | Live product display (UI unblocked via D-008) | 🔬 §11.1 — re-verified 08-10, still `total: 0` |

## 🟡 NON-BLOCKING / LATER
Energy-point API (not found in the API surface) · app deep-link scheme + universal-link files ·
i18n decision (zh-only vs zh+en) · preview-record policy (site currently promises results are
*not* saved — PRD wants them saved) · brand assets (logo SVG, CJK webfont, OG images) ·
GA4 / Pixel IDs + Search Console · admin role assignments · scope ruling on existing app features
the PRD omits (mentors, 万年历, ads, 档案) · PlenorHub key rotation after handover.

---

# 14. Implementation Status

## Completed this session
| Artifact | Purpose |
|---|---|
| `feat/production-foundation` branch | Safe checkpoint; `main` untouched |
| `tools/calc-capture/capture.mjs` | Re-runnable, read-only fixture harness |
| `tests/fixtures/numerology/production-baseline.json` | **12 golden-master fixtures** — the irreplaceable artifact |
| This document | Living knowledge base + decision log |

## Next, in order
1. Monorepo split (`apps/web`, `apps/admin`, `packages/*`) — D-002
2. Light/dark token system, SSR-safe via cookie (no flash) + CJK font stack
3. Sections → typed props, server-rendered; delete `temp-home.html` + scrape scripts
4. CMS schema + Route Handlers; replace localStorage provider
5. Admin shell + auth provider interface (D-004) + RBAC + audit foundation
6. Numerology port + regression suite against fixtures
7. PlenorHub adapter + tier-discount pricing (D-008/D-009)
8. Dashboard (on B-2) · Tarot (on B-1) · UAT deploy (on B-3)

**Not started, by instruction:** production deploy, WordPress modification, destructive DB changes.
