# numforlife.com UI Implementation Differences Report

**Project:** `clientdemo/frontend` (Next.js App Router)  
**Reference:** https://numforlife.com/  
**Analysis date:** 2026-08-15  
**Status:** Analysis only — **no application UI code was modified**

**Visual references used:**
- **Screenshot 1** — current implementation (UAT/local dark theme)
- **Screenshot 2** — reference/target direction (production numforlife.com header + hero)
- **Live site** — fetched HTML/CSS/JS and interactive structure inspection

**Reference artifacts:** `reference-numforlife/` (public HTML/CSS excerpts, `notes.md`, token summary)

---

## A. Executive Summary

### Overall visual difference

Our frontend is **structurally inspired by** numforlife.com (same fonts, similar section order, shared media URLs) but **visually and behaviorally diverges** in theme treatment, header controls, button styling, language mix, commerce integration, animation timing, and several page layouts. The reference site is a **WordPress + Elementor + WooCommerce** marketing storefront with a **fixed black-first aesthetic** and plugin-driven dark mode. Our site is a **Next.js CMS-driven app** with a **dual light/dark design token system**, extra routes (calculators, dashboard, membership), and a **PlenorHub-backed shop** instead of WooCommerce.

### Current implementation characteristics

| Aspect | Our implementation |
|--------|-------------------|
| Stack | Next.js 16.3, React 19, Tailwind CSS 4, Framer Motion 13 |
| Fonts | Work Sans + Azeret Mono (Google) + system CJK stack |
| Theme | CSS variable tokens; user theme toggle (light / dark / system) |
| Dark bg | `#0b0a14` navy-purple (not pure black) |
| Header | Fixed blur header; **no cart**; theme toggle; English login label |
| Footer | Embedded in `ContactSection` on homepage + several pages; not global in `LayoutShell` |
| Commerce | PlenorHub API catalog at `/shop`; reference uses WooCommerce at `/shopping/` |
| Animations | Framer Motion `FadeIn` (scroll-triggered); partial parallax in gallery |
| Language | Mixed EN/ZH across nav-adjacent UI, CMS defaults, forms, shop, login |

### Reference design characteristics

| Aspect | numforlife.com |
|--------|----------------|
| Stack | WordPress + Hello Elementor + Elementor Pro + WooCommerce |
| Theme | Black `#000000` dominant; optional dark-mode plugin (`.darkmode--activated`) |
| Header | Logo + 4 nav items + **WooCommerce side-cart** + amber login button |
| Hero | Centered EN headline; ZH tagline; amber pill CTA with **white text** |
| Animations | Elementor `fadeInUp` on load/viewport; motion FX parallax; carousel autoplay |
| Language | Predominantly Chinese UI labels; English used in hero/marketing copy |
| Login | Easy Login WooCommerce popup modal + `/sign-up/` |

### Main areas requiring changes

1. **Header** — cart, login styling, nav items, remove/replace theme toggle behavior
2. **Global theme/background** — match reference black-first palette on marketing pages
3. **Hero** — typography scale, line breaks, CTA colors, anchor target, typing effect (client bug #2)
4. **Language** — Chinese-first UI copy sitewide (client bug #5)
5. **Footer/contact block** — form labels, submit button, legal link set, global placement
6. **Shop** — layout/grid/cards vs WooCommerce reference (client bug #7–8)
7. **Animations** — scroll fade-in parity, hero entrance timing, app section motion (client bug #1)
8. **Page-specific layouts** — contact, portfolio, login, product detail

### Most significant visual differences

| # | Difference | Type |
|---|------------|------|
| 1 | No cart icon / side-cart in header | Structural + behavioral |
| 2 | Theme toggle in header (reference uses separate dark-mode widget) | Structural |
| 3 | Dark background is navy-purple, not pure black | Stylistic |
| 4 | Hero CTA uses dark text on amber (`accent-fg`) vs reference white text | Stylistic |
| 5 | Login button ghost/outline with `text-fg` vs amber border + amber text | Stylistic |
| 6 | Mixed English across CMS sections, forms, portfolio, login | Content + stylistic |
| 7 | Shop is API catalog grid, not WooCommerce product loop | Structural |
| 8 | Contact page adds English `ConnectIntroSection` | Structural |
| 9 | Portfolio service titles in English linking to production URLs | Content + behavioral |
| 10 | Missing Elementor-style entrance animation density | Animation |

### Difference classification

- **Structural:** header cart, shop system, login modal vs page, footer wiring, extra nav item (测算), page composition
- **Stylistic:** colors, typography weights, button fills, border radii, background glow intensity
- **Behavioral:** cart slide-in, login popup, scroll anchors, external product links
- **Animation-related:** fadeInUp timing, typing effect, app section scroll fade, carousel motion

---

## Project Architecture (Current — Inspected, Not Modified)

### Framework & entry

| Item | Location / value |
|------|------------------|
| Framework | Next.js 16.3 App Router |
| Root layout | `frontend/app/layout.tsx` |
| Global styles | `frontend/app/globals.css` |
| Shell | `frontend/components/layout/LayoutShell.tsx` |
| Content | CMS SQLite + `packages/shared/lib/cms/` |
| Shared UI | `packages/shared/components/ui/` |

### Page inventory (all routes)

| Route | Primary UI |
|-------|------------|
| `/` | Homepage blocks via `HomePageRenderer` |
| `/about-us` | About sections + `ContactSection` |
| `/contact-us` | `ConnectIntroSection` + `ContactSection` |
| `/portfolio` | `ProductServicesSection` + `ContactSection` |
| `/shop`, `/shopping` | `ShopCatalogView` (PlenorHub) |
| `/shop/[id]` | `ProductDetailView` |
| `/login` | `MemberLoginForm` (KCC ID) |
| `/dashboard` | `DashboardShell` |
| `/membership` | Membership marketing |
| `/celue`, `/celue/[slug]`, `/celue/[slug]/result` | Calculator flows |
| `/faq` | FAQ accordion |
| Legal: `/accessibility-statement`, `/privacy-policy`, `/terms-of-use`, `/refund-policy`, `/shipping-policy` | `LegalDocumentBody` |

### Key components

| Component | File |
|-----------|------|
| Header | `frontend/components/layout/Header.tsx` |
| Footer (standalone, unused globally) | `frontend/components/layout/Footer.tsx` |
| Hero | `frontend/components/sections/Hero.tsx` |
| Gallery | `frontend/components/sections/ImageGallery.tsx` |
| App download | `frontend/components/sections/AppDownload.tsx` |
| Ecosystem | `frontend/components/sections/EcosystemSection.tsx` |
| Contact/footer block | `frontend/components/sections/ContactSection.tsx` |
| FadeIn | `packages/shared/components/ui/FadeIn.tsx` |
| Button | `packages/shared/components/ui/Button.tsx` |
| Theme toggle | `packages/shared/components/ui/ThemeToggle.tsx` |

### Animation library

- **Framer Motion** used in Header, Hero (via FadeIn), gallery parallax, testimonials carousel, ecosystem icons, app download phone float, login form entrance
- **CSS:** `scroll-behavior: smooth`, skeleton shimmer keyframes
- **No** typing animation library present

### Responsive implementation

- Tailwind breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280
- Container: `.section-container` → `max-w-7xl` (1280px) with responsive horizontal padding
- Header height: `h-16` (64px) / `md:h-[72px]`
- Mobile nav: full-screen overlay with Framer Motion stagger

---

## B. Global Design System Comparison

| Category | Current Implementation | numforlife.com | Required Change |
|----------|------------------------|----------------|-----------------|
| Overall theme | Dual light/dark token system; dark = navy `#0b0a14` | Black-first `#000000`; optional invert dark-mode plugin | Marketing pages should default to reference black palette; reconcile or hide theme toggle |
| Background | `--bg` dark `#0b0a14`; light `#fbfaf7` | `#000000` on header/hero/most marketing sections | Use pure black for public marketing surfaces |
| Primary color | Black/near-black text on light; near-white on dark | `#FFFFFF` on dark bg | Align text contrast pairs per section bg |
| Accent color | `#ffc107` (measured, shared) | `#FFC107` (measured) | Keep hex; fix **where** accent is applied (CTA text, login border) |
| Accent hover | `#ff4e27` (measured) | `#FF4E27` mobile cart, section bands | Already aligned in tokens; apply consistently |
| Text color | `--fg` dark theme `#f4f2ff` (lavender-white) | `#FFFFFF` | Reference uses cleaner white, not lavender tint |
| Secondary text | `--fg-muted` `#a8a3c2` | `#7A7A7A` on light sections | Muted tone differs; use reference gray on white sections |
| Border color | `rgba(255,255,255,0.1)` dark | `#000` 1px form underlines on white cards | Match footer form underline style |
| Border radius | Pills `rounded-full`; cards `rounded-[28-44px]`; gallery `20-30px` | Pills `30px`; footer card `20px`; gallery `30px` | Minor radius tuning on CTAs (30px vs full pill) |
| Shadows | Tokenized `--shadow-md/lg`; hero CTA shadow on Button | Minimal; flat black site | Reduce heavy glow shadows on reference match |
| Glow effects | Hero radial `rgba(255,193,7,0.08)`; dark `--glow` amber | Stronger centered warmth in screenshots | Increase hero radial intensity (estimated) |
| Visual density | More padding/spacing in Tailwind sections | Elementor % padding (hero ~10% top) | Tune hero vertical padding |
| Content width | `max-w-7xl` (1280px) | Elementor full-width containers | Reference feels wider/full-bleed |
| Spacing system | Tailwind scale (4px base) | Elementor px + % padding | Map section py to reference values |

---

## C. Typography Comparison

### Font families

| Role | Current | Reference | Match? |
|------|---------|-----------|--------|
| Display / headings | Work Sans (Google, loaded in layout) | Work Sans (inspected) | Yes |
| UI / mono accents | Azeret Mono (Google) | Azeret Mono (inspected) | Yes |
| Chinese | System CJK stack (`PingFang SC`, `Microsoft YaHei`, etc.) | System/browser default on WP | Similar approach |
| Body fallback | `--font-cjk` appended to sans | Roboto in Elementor kit (often overridden) | N/A |

### Typography by element

| Element | Current (inspected) | Reference (measured from CSS) | Difference |
|---------|---------------------|-------------------------------|------------|
| Logo text | `text-lg`→`lg:text-[28px]`, bold, Work Sans | 46px / 30px mobile, weight 600 | Reference logo **larger** on desktop |
| Nav links | Work Sans `text-sm`, weight normal | Azeret Mono 12px, weight 500, pill padding 10×25px | Reference uses **mono pills**, not plain links |
| Hero tagline | `.section-eyebrow` sm/base, semibold | 14px, weight 600, white | Close; reference slightly smaller fixed 14px |
| Hero heading | `clamp(1.5rem, 5.5vw, 2.8125rem)` semibold, 4 lines | 45px / 24px mobile, weight 600, 50px/32px line-height, ~38% width desktop | Reference **single block** with constrained width; we split 4 lines manually |
| Section headings | `.section-heading-lg` up to 46-52px | 46px common; footer title **120px** | Footer title scale matches; ecosystem headings differ in language |
| Body / mono copy | `.section-copy` mono xs/sm | Azeret Mono 12px in feature descriptions | Similar |
| Buttons (primary) | Work Sans sm semibold | Azeret Mono 12px weight 500 on hero CTA | Reference hero CTA uses **mono**, we use sans |
| Footer copyright | Work Sans xs bold | Azeret Mono 12px | Reference uses mono for copyright |
| Form labels | Work Sans 13-14px bold | Work Sans 14px 600 black on white card | Similar weight; our labels **English** |
| Legal links | Work Sans xs bold | Work Sans via Elementor nav | Similar size; label language differs |

### Line height & letter spacing

- Current: `:lang(zh)` global `line-height: 1.85`, `letter-spacing: 0.01em` (measured in globals.css)
- Reference: hero headline `line-height: 50px` at 45px (~1.11) — **tighter** than our hero `leading-[1.25]` / `md:leading-[50px]`
- Client bug #2: reference hero has **typing effect** — not present in our implementation

---

## D. Header Comparison

| Property | Current | Reference | Screenshot notes |
|----------|---------|-----------|------------------|
| Height | 64px / 72px md | ~2% vertical padding on black bar | SS1: taller feel due to theme toggle row |
| Position | `fixed`, blur backdrop | Fixed black bar | Both fixed |
| Background | `bg-bg/80` + blur; glass on scroll | `#000000` solid | SS2: pure black header |
| Logo | Text 数易赋能, left | Text 数易赋能 h2, 46px | SS1/SS2: similar placement |
| Nav position | Absolute centered | Center column ~40% width | Similar layout intent |
| Nav items | 测算, 产品服务, 关于我们, 联系, 商店 (5) | 产品服务, 关于我们, 联系, 商店 (4) | **Extra 测算** in ours; SS1 shows 5 items |
| Nav style | Plain links, opacity hover | Azeret Mono pill links | Reference pills not implemented |
| Cart | **Missing** | WooCommerce side-cart, amber bubble `#FFC107` | SS2: cart visible; SS1: no cart |
| Login | `Login / Sign Up` English, border-accent/80, text-fg | `Login / Sign Up`, amber `#FFC107` 2px border, amber text; hover fill | SS1: white ghost; SS2: amber outline |
| Theme toggle | **Sun/moon/monitor** in header | Separate dark-mode widget (not in header) | SS1: prominent; SS2: floating sun bottom-right (plugin) |
| Mobile menu | Full-screen overlay, hamburger | Elementor dropdown mega menu | Different animation/structure |
| Scroll behavior | Adds glass + border after 40px scroll | Static black (inspected) | Ours changes appearance on scroll |
| Active state | None visible | Elementor menu current item styling | Not implemented |

**Required:** Add cart UI (or equivalent), restyle login to `.btn-login-css` pattern, remove/reposition theme toggle, align nav item set and styling, use pure black header bg.

---

## E. Hero Section Comparison

| Property | Current | Reference | Notes |
|----------|---------|-----------|-------|
| Height | `min-h-[100svh]` | Full viewport column with % padding | Similar full-screen intent |
| Background | `--bg` + radial amber 8% opacity | `#000000` | SS1: subtle glow; reference similar but stronger in SS2 |
| Tagline | CMS `hero.tagline` ZH | 数易赋能，您的人生导航 | Same content |
| Headline | 4 CMS lines, EN | Single EN sentence, wraps naturally | Line break strategy differs |
| Headline size | clamp max 45px | 45px desktop, 24px mobile | Close on desktop |
| Headline width | max-w 900px centered | 38% container width desktop | Reference **narrower** column |
| CTA text | 请改变自己吧 | 请改变自己吧 | Same |
| CTA link | `#ecosystem` | `#12` (app download anchor) | **Wrong scroll target** |
| CTA bg | `#ffc107` | `#ffc107` | Match |
| CTA text color | `accent-fg` `#14131a` (dark) | `#FFFFFF` white (measured CSS) | **Critical mismatch** — SS2 shows dark text on amber in some crops but reference CSS specifies white |
| CTA font | Work Sans semibold sm | Azeret Mono 12px 500 | Font family mismatch |
| CTA radius | `rounded-full` | 30px | Effectively similar |
| Entrance animation | FadeIn delays 0.1–0.55s scroll/viewport | fadeInUp 100/400/1000ms on load | Reference animates on **page load**, ours on **scroll into view** for below-fold perception |
| Typing effect | None | Present on reference (client bug #2) | Missing |

---

## F. Buttons

### Login / Sign Up (header)

| Property | Current | Reference |
|----------|---------|-----------|
| Shape | Pill (`rounded-full`) | Rectangular pill ~30px radius |
| Border | 1px `border-accent/80` | 2px solid `#FFC107` |
| Text | `text-fg` (white in dark) | `#FFC107` amber |
| Background | Transparent | Transparent |
| Hover | `bg-accent/10` | `bg #FFC107`, text `#000` |
| Font | Work Sans sm | Azeret Mono (inferred) |

### Hero CTA

| Property | Current (`Button` primary) | Reference |
|----------|---------------------------|-----------|
| Background | `#ffc107` | `#ffc107` |
| Text | `#14131a` | `#ffffff` |
| Shadow | Amber glow shadow | Flat (inspected) |
| Hover | → `#ff4e27` + shadow | Not measured |
| Motion | scale 1.03 hover | fadeInUp entrance |

### Footer form Submit

| Property | Current | Reference |
|----------|---------|-----------|
| Background | `bg-bg` (theme-dependent) | `#000000` |
| Text | `text-fg` uppercase tracking | White on black |
| Radius | `rounded-full` | ~50px pill |
| Label | "Submit" English | "SUBMIT" |

### App download Send

| Property | Current | Reference |
|----------|---------|-----------|
| Background | `#ffc107` | `#ffc107` (inspected) |
| Hover | `#FF4E27` via Framer | Not measured |
| Shape | Rectangular min-h 44px | Similar amber CTA |

---

## G. Icons

| Icon | Current | Reference | Difference |
|------|---------|-----------|------------|
| Cart | **Absent** | WooCommerce SVG, amber qty bubble | Must add |
| Theme | Lucide sun/moon/monitor in header | Dark mode plugin floating toggle | Different placement & UX |
| Mobile menu | Lucide Menu/X 24px | Elementor bars SVG white | Similar role |
| Login form | Lucide Mail/Lock | xoo-el modal icons | Different context |
| Ecosystem features | PNG icons `/icons/ecosystem/` + CMS | Elementor icon boxes, gray `#CDCDCD` | Different asset pipeline |
| App store badges | Google PNG + Apple AVIF from WP | Same remote assets | Match |
| QR placeholder | Inline SVG black squares | Same pattern on reference | Match |
| Partner logos | Remote WP PNGs | Same URLs | Match |
| Floating "N" | Next.js/dev artifact in SS1 | Not on reference | Remove in production builds |

**Icon library:** Current uses **lucide-react**; reference uses **Elementor e-icons / Font Awesome / SVG**.

---

## H. Footer Comparison

### Structure

| Aspect | Current (`ContactSection`) | Reference (Elementor footer #199) |
|--------|---------------------------|-----------------------------------|
| Placement | Section at bottom of homepage, about, portfolio, contact | Global footer template all pages |
| Title | 联系我们 CMS | 联系我们 120px centered |
| Columns | 3: contact + nav + form | 3: 25% / 25% / 50% |
| Contact email | Amber link, bold | Amber/yellow link |
| Placeholders | "Contact Pending" / "Address Pending" EN | Same English placeholders |
| Nav column | 产品服务, 关于我们, 联系我们 | Same three links |
| Form card | White/surface rounded 28-44px | White `#fff` radius 20px padding 50px |
| Legal row | CMS `footer.links` incl. FAQ | 5 legal links, no FAQ |
| Copyright | `© 2035 by 数易赋能` (fixed bug #4) | Same text (Wix link leftover on reference) |

### Differences

1. **Not global** — pages without `ContactSection` lack footer (dashboard, shop-only bottom, legal pages)
2. **Form labels English** — Name, Phone, Email, Message vs reference (same English on reference form)
3. **Submit button colors inverted** vs reference black pill
4. **Extra FAQ link** in our legal row
5. **Contact page** adds `ConnectIntroSection` above footer block — not on reference contact page
6. **Reference contact page** uses simpler heading + real address (Mountain View) — our contact page differs (client bug #6)

---

## I. Colors (Detailed)

```
Main background
  Current (dark):  #0b0a14  [measured token]
  Reference:       #000000  [measured]
  Required:        Use #000000 on marketing pages

Hero radial glow
  Current:         rgba(255,193,7,0.08)  [measured]
  Reference:       Stronger warm center glow  [estimated from screenshots]
  Required:        Increase opacity/spread

Accent amber
  Current:         #ffc107  [measured]
  Reference:       #FFC107  [measured]
  Difference:      None

Accent orange
  Current:         #ff4e27  [measured]
  Reference:       #FF4E27  [measured]
  Difference:      None

Hero CTA text
  Current:         #14131a  [measured accent-fg]
  Reference:       #FFFFFF  [measured post-161.css]
  Required:        White text on amber CTA

Login button text/border
  Current:         border accent/80, text fg (white)
  Reference:       border/text #FFC107, hover fill amber
  Required:        Amber outlined login

Dark mode plugin blue
  Current:         N/A (our theme toggle)
  Reference:       #003ef8 when .darkmode--activated
  Required:        Decide whether to replicate plugin behavior

Footer form card
  Current:         var(--surface) white in light / elevated in dark
  Reference:       #FFFFFF fixed
  Required:        Always white card on black footer bg

Violet accent (ours only)
  Current:         #6d4aff / #a58cff
  Reference:       Not used in marketing UI
  Required:        Remove from public marketing surfaces
```

---

## J. Spacing & Dimensions

| Area | Current (inspected) | Reference (measured/estimated) |
|------|---------------------|--------------------------------|
| Container max-width | 1280px (`max-w-7xl`) | Full Elementor width with inner columns |
| Header px | `section-container` px-5→lg:px-16 | ~2% horizontal padding |
| Hero pt | pt-24→md:pt-32 | ~10% top padding |
| Hero heading mt | mt-6→md:mt-10 after tagline | Tighter in reference (client bug #2 line spacing) |
| Gallery column gap | md:gap-[70px] | Similar 70px gap (inspected) |
| Gallery image radius | 20px sm / 30px md | 30px |
| Ecosystem grid gap | lg:gap-x-[70px] lg:gap-y-20 | Similar multi-column |
| Footer title | clamp up to 130px | 120px fixed desktop |
| Footer section pt | lg:min-h 90vh | Large vertical footer area |
| Page shell offset | pt-[72px] md:pt-[80px] | Header clearance — aligned |

---

## K. Animations & Motion

### Reference animation inventory (inspected)

| Element | Trigger | Type | Duration/delay | Current behavior |
|---------|---------|------|----------------|------------------|
| Hero tagline | Load/viewport | fadeInUp | 100ms | FadeIn on view, delay 0.1s |
| Hero headline | Load/viewport | fadeInUp | 400ms | FadeIn per line, stagger 0.08s |
| Hero CTA | Load/viewport | fadeInUp | 1000ms | FadeIn delay 0.55s |
| Hero headline text | Load | **Typing effect** | n/a | **Missing** |
| Gallery side images | Scroll | translateY parallax | motion FX speed 4 | Implemented via Framer scroll (similar) |
| Gallery center | Scroll | Static/lighter | — | md:-mt-16 offset (similar stagger layout) |
| App download phone | Scroll | fadeInRight | stagger | fadeInRight + **infinite float** (extra vs reference) |
| App section content | Scroll | fadeIn on scroll | client bug #1 | Partial — needs scroll fade parity |
| Ecosystem icons | Scroll | fadeInUp + scale spring | 700ms + stagger | Similar via FeatureBlock |
| Testimonials | Carousel | Swiper autoplay 5s | — | Framer AnimatePresence carousel (different UX) |
| Partners logos | Hover | scale | — | scale 1.05 on hover |
| Header | Load | slide down | 600ms | motion y:-100 → 0 (extra vs reference) |
| Login modal | Click | fadeIn popup 1.2s | — | Full page `/login` instead |
| Buttons | Hover | scale 1.02-1.04 | 250-300ms | scale 1.03 (similar) |

### Animation spec template (gaps to implement)

```
Element: Hero headline typing
Trigger: Page load after fade-in
Initial state: opacity 0 / partial text
Final state: Full headline visible character-by-character
Animation type: Typing / typewriter
Duration: ~2-4s (estimated from reference)
Reference behavior: Visible on numforlife.com hero
Current behavior: Static text with FadeIn only
Required: Implement typewriter on hero lines

Element: App download section
Trigger: Scroll into viewport
Initial state: opacity 0 translateY
Final state: opacity 1 translateY 0
Reference behavior: fadeIn when scrolling (client bug #1)
Current behavior: FadeIn present but phone also infinite floats
Required: Match reference scroll fade; tune/remove float if not on reference
```

---

## L. Scroll Behavior

| Behavior | Current | Reference |
|----------|---------|-----------|
| Smooth scroll | `scroll-behavior: smooth` on html | Anchor links (#12) |
| Header on scroll | Glass + shadow after 40px | Static black |
| Section entrance | whileInView FadeIn margin -80px | Elementor viewport animations |
| Parallax | Gallery side columns | motion_fx_translateY |
| Footer entrance | FadeIn in ContactSection | Elementor fadeInUp |
| Scroll-to-top | Not observed | Not observed |

---

## M. Responsive Behavior

### Breakpoints

| Viewport | Current | Reference |
|----------|---------|-----------|
| Elementor tablet | md 768 / lg 1024 | ≤1024px tablet |
| Elementor mobile | sm/md | ≤767px mobile |
| WooCommerce | — | ≤768px |

### Per-viewport changes (summary)

| Viewport | Header | Hero | Footer |
|----------|--------|------|--------|
| 1920/1440 desktop | Full nav + theme + login | 4-line headline, large CTA | 3-column + legal row |
| 1280 laptop | Same, container 1280 | clamp scales down | Form fixed ~580px |
| 1024 tablet | Nav hidden → hamburger at md | Heading clamp | Stacks to 1 col |
| 768 mobile | Overlay menu | Single column hero | Title clamp smaller |
| 390/375 mobile | Hamburger + login in menu | 24px-ref headline size target | Legal links wrap |

**Screenshot 1:** desktop dark with full nav — matches md+ layout.  
**Screenshot 2:** reference desktop with cart — target header right side.

---

## N. Page-by-Page Difference Summary

### Homepage `/`

| Section | Match level | Key gaps |
|---------|-------------|----------|
| Header | Partial | Cart, login style, nav count, theme toggle |
| Hero | Partial | CTA text color, anchor, typing, line spacing |
| Gallery | Good | Parallax present; tune radius/motion |
| Brand title | Good | 数易赋能 centered |
| App download | Partial | English headings; scroll fade; orange band layout |
| About | Partial | EN label "ABOUT", "READ MORE" |
| Ecosystem | Partial | EN section labels in CMS defaults |
| Results | Partial | EN labels |
| Partners | Good | Same logos |
| Testimonials | Partial | Carousel differs from Swiper reference |
| Contact/footer | Partial | Form submit styling; legal links |

### `/portfolio`

| Aspect | Current | Reference |
|--------|---------|-----------|
| Title | "Product Services" EN | Chinese service names |
| Grid | 2×2 EN titles, external URLs to production | 4 cards → internal `/number` etc. |
| Links | `numforlife.com/number` hardcoded | Relative paths on same site |

### `/shop` & `/shopping`

| Aspect | Current | Reference |
|--------|---------|-----------|
| Backend | PlenorHub API | WooCommerce |
| Layout | Category pills + product cards | WC loop, sort dropdown, add/buy buttons |
| Product detail | Custom `ProductDetailView` | WC single product template |
| Styling | Tailwind cards rounded-28px | `#ffc107` WC buttons, monospace sort label |

### `/contact-us`

| Aspect | Current | Reference |
|--------|---------|-----------|
| Intro | English `ConnectIntroSection` | Minimal Chinese heading + address |
| Footer block | Full ContactSection | Different page structure |

### `/about-us`

| Aspect | Current | Reference |
|--------|---------|-----------|
| Sections | Story, bio, values, team, partners | Similar section types |
| Language | Mixed EN headings in about sections | Mixed ZH/EN on reference |
| Footer | ContactSection appended | Global footer template |

### `/login`

| Aspect | Current | Reference |
|--------|---------|-----------|
| UX | Dedicated page, KCC ID form | Modal popup (Easy Login WooCommerce) |
| Copy | Mixed "Sign In" + 登录 | Tabbed Login / Sign Up in popup |
| Visual | Rounded card form, lucide icons | Elementor popup #3802 |

### `/dashboard`, `/celue/*`, `/membership`, `/faq`

No direct reference pages — **new functionality** beyond reference marketing site. Style should inherit global header/footer/tokens but not compared section-by-section to numforlife.com.

### Legal pages

| Aspect | Current | Reference |
|--------|---------|-----------|
| Body | JSON content, mixed token colors | WP page content |
| Footer links | Not in LayoutShell globally | In footer template |

---

## O. Component-by-Component Difference Matrix

| Component | Current Implementation | Reference | Difference | Priority |
|-----------|------------------------|-----------|------------|----------|
| Header | Fixed blur, 5 nav, theme toggle, no cart | Black bar, 4 nav, cart, amber login | Cart missing; login style; extra nav; theme toggle | **High** |
| Logo | 28px max text | 46px Work Sans | Smaller logo | **High** |
| Navigation | Plain Work Sans links | Azeret Mono pills | Style + item count | **High** |
| Cart | None | WC side-cart amber bubble | Not implemented | **High** |
| Login button | Ghost white/accent border | Amber outline/fill hover | Color + hover | **High** |
| Theme toggle | Header 3-way | Plugin floating widget | Different UX | **Medium** |
| Hero | 4-line FadeIn, dark CTA text | fadeInUp, white CTA text, typing | CTA color, animation, typing | **High** |
| Hero typography | clamp 45px, 4 lines | 45px constrained width | Line breaks/spacing | **High** |
| Hero CTA target | #ecosystem | #12 | Wrong anchor | **Medium** |
| Background | Navy `#0b0a14` | Pure `#000000` | Palette | **High** |
| Gallery | Framer parallax | motion FX translateY | Close — tune | **Low** |
| App download | EN copy, phone float | ZH-forward, scroll fade | Language + motion | **High** |
| About/ecosystem | EN CMS defaults | ZH primary | Language | **High** |
| Testimonials | Framer carousel | Swiper autoplay | Different component | **Medium** |
| Footer block | ContactSection | Global footer #199 | Placement + submit btn | **High** |
| Portfolio grid | EN external links | ZH internal routes | Layout + links | **High** |
| Shop | PlenorHub grid | WooCommerce loop | Completely different | **High** |
| Product detail | Custom view | WC template | Layout mismatch | **High** |
| Contact page | ConnectIntro + footer | Simple contact content | Extra section | **High** |
| Login | Full page KCC | Modal popup | UX pattern | **High** |
| Favicon | icon.png added (bug #3) | Logo favicon | **Fixed** | — |
| Copyright | 数易赋能 (bug #4) | 数易赋能 | **Fixed** | — |
| Animations | Framer whileInView | Elementor fadeInUp load | Timing/trigger | **High** |
| Responsive | Tailwind md/lg | Elementor 767/1024 | Close enough | **Medium** |
| Language | Mixed EN/ZH | Chinese-primary UI | Sitewide copy | **High** |

---

## P. Implementation Priority

### P0 — Critical (visual parity blockers)

1. Header: cart + login amber styling + pure black bar
2. Hero: CTA white text on amber, typography/line spacing, typing effect
3. Global marketing background `#000000` (not navy-purple)
4. Chinese-primary UI labels (nav-adjacent, CMS defaults, forms where reference uses ZH)
5. Footer/contact submit button + global footer placement
6. Portfolio: Chinese titles + internal routes
7. Shop + product layout vs WooCommerce reference

### P1 — High

1. Remove or relocate theme toggle to match reference
2. Nav pill styling (Azeret Mono 12px)
3. Logo size increase to ~46px desktop
4. App download scroll animations + copy localization
5. Contact page layout vs reference
6. Login UX (modal vs page) — product decision
7. Hero CTA anchor `#12` / app section id
8. Animation trigger alignment (load vs scroll)

### P2 — Medium

1. Testimonials carousel → Swiper-like behavior
2. Partner/testimonial hover polish
3. Gallery radius 30px consistency
4. Legal footer link set (remove FAQ if not on reference)
5. Header scroll glass effect removal
6. Product card hover scale tuning

### P3 — Minor

1. Scrollbar styling (reference custom webkit scrollbar)
2. Violet accent removal on marketing pages
3. Shadow reduction on buttons
4. Floating dev/Next icon removal in production

---

## Q. Implementation Roadmap (Recommended Order)

1. **Global theme** — black marketing palette, section background tokens
2. **Typography** — logo scale, nav mono pills, hero scale/line-height
3. **Header** — cart, login, nav items, remove theme toggle from header
4. **Hero** — CTA colors, anchor, typing animation, fadeInUp timing
5. **Buttons** — shared amber/white/black button variants matching reference
6. **Icons** — cart, store badges parity
7. **Home sections** — app download, ecosystem, about language + motion
8. **Footer** — global footer, form submit, legal links
9. **Portfolio / contact / shop pages** — layout swaps
10. **Login** — modal vs page decision + styling
11. **Animations** — scroll triggers, parallax tuning, carousel
12. **Responsive** — breakpoint QA at 375/768/1024/1440
13. **Final polish** — hover states, shadows, glow intensity

---

## R. Screenshot-Based Cross-Reference

| Observation | SS1 (current) | SS2 (reference) | Live reference |
|-------------|---------------|-----------------|----------------|
| Theme controls in header | Yes (3 icons) | No | No (plugin widget elsewhere) |
| Cart in header | No | Yes with badge | Yes |
| Login button style | White ghost outline | Amber outline | Amber `#FFC107` border |
| Nav item count | 5 (incl. 测算) | 4 | 4 |
| Hero line count | 4 lines | 3 lines wrapped | Single heading block |
| Hero glow | Subtle radial | Stronger warm center | Black + content |
| CTA button | Yellow fill, dark text | Yellow fill | White text per CSS |
| Bottom-left icon | "N" dev artifact | None | None |
| Bottom-right floating | None in SS1 | Sun/theme widget | Dark mode plugin |

---

## S. Reference Inspection Log

### Successfully inspected

- Live HTML for `/`, `/about-us`, `/contact-us`, `/portfolio`, `/shopping`
- Elementor post CSS: header (#187), homepage (#161), footer (#199), global kit (#4)
- Public assets and inline styles
- Animation class names, Motion FX attributes, WooCommerce cart structure
- Saved copies under `reference-numforlife/`

### Could not fully inspect

- Exact JavaScript animation durations for typing effect (minified Elementor/Custom JS — **estimated** from visual behavior)
- All calculator/member pages (do not exist on reference)
- Authenticated `/my-account/` styling
- Pixel-perfect computed styles at every breakpoint (used CSS files + HTML classes; some values **estimated**)
- Dark mode plugin widget position varies by page load — described from HTML/CSS classes

### Reference folder contents

```
reference-numforlife/
├── notes.md
├── homepage.html, about-us.html, contact-us.html, portfolio.html, shopping.html
├── header-excerpt.html, hero-excerpt.html, footer-excerpt.html
├── post-161.css, post-187.css, post-199.css, post-4-global-kit.css
├── colors-fonts.css
└── elementor-gf-roboto.css
```

**Important:** Reference material is analysis-only and was **not imported** into application code.

---

## T. Confirmation

| Item | Status |
|------|--------|
| Application UI modified | **NO** |
| Components changed | **NO** |
| CSS/Tailwind changed | **NO** |
| Dependencies changed | **NO** |
| Report created | `docs/NUMFORLIFE_UI_DIFFERENCES_REPORT.md` |
| Reference folder created | `reference-numforlife/` |

---

*End of report. Use this document as the implementation specification for the next phase.*
