# numforlife.com UI Reference — UI Diff Report Input

**Source:** https://numforlife.com/ (fetched 2026-08-15)  
**Stack:** WordPress + Hello Elementor theme + Elementor Pro + WooCommerce  
**Purpose:** Reference-only; not imported into app code.

---

## 1. Responsive / Meta

| Item | Value |
|------|-------|
| Viewport | `width=device-width, initial-scale=1` |
| Theme color | `#2b2b2b` |
| Apple status bar | `black-translucent` |
| HTML lang | `en-US` |
| Body classes (homepage) | `home`, `page-id-161`, `theme-hello-elementor`, `woocommerce-no-js`, `elementor-kit-4`, `elementor-page-161` |
| Elementor breakpoints | Desktop default; tablet ≤1024px; mobile ≤767px |
| WooCommerce smallscreen CSS | `@media (max-width: 768px)` |

---

## 2. Header (`elementor-location-header`, post ID **187**)

### Layout (desktop)
Three-column flex row on black (`#000000`) bar, ~2% vertical padding:
1. **Logo** (left, ~19% width): `<h2>` link “数易赋能” → `/`
2. **Nav** (center, ~40%): Elementor Pro Mega Menu (`e-n-menu`, horizontal)
3. **Actions** (right, ~30%): WooCommerce side-cart + login HTML widget

### Nav items (header mega menu)
| Label (ZH) | URL |
|------------|-----|
| 产品服务 | `/portfolio` |
| 关于我们 | `/about-us` |
| 联系 | `/contact-us` |
| 商店 | `/shopping/` |

### Mobile header (`elementor-hidden-desktop`)
- Hamburger icon (white SVG) + centered logo
- Dropdown mega menu (`e-n-menu-layout-dropdown`)
- Cart icon (orange `#FF4E27` on mobile vs amber `#FFC107` desktop)
- Login injected into `#userInfo-mobile`

### Cart (Elementor WooCommerce Menu Cart)
- Type: **side-cart** (slides from right, `translateX(100%)`)
- Toggle: price text + qty bubble + cart SVG
- Classes: `elementor-menu-cart--items-indicator-bubble`, `toggle-icon--cart-medium`
- Qty bubble color: `#FFC107` (light) / `#003ef8` (dark mode)
- Cart SVG fill: white

### Login button
Injected via custom HTML/JS (not native Elementor widget):
- **Logged out:** links to `/sign-up/` with `.btn-login-css`
  - Desktop label: `Login / Sign Up`
  - Mobile label: `Login`
- **Logged in:** `My Acc` → `/my-account/`
- Cookie checked: `wordpress_logged_in_*`

**`.btn-login-css` styling (from post-187.css):**
```css
background-color: transparent;
color: #FFC107;
border: 2px solid #FFC107;
/* hover */
background-color: #FFC107;
color: #000;
```

Alternate inline styles for `#userInfo02 button`: white 2px border, transparent bg, white text.

### Header typography
- Logo: **Work Sans**, 46px (30px mobile), weight 600, `#FFFFFF`
- Nav links: **Azeret Mono**, 12px, weight 500, white text, pill radius 30px, padding 10px 25px
- Nav icon accent: `#FFC107`

---

## 3. Hero (homepage, Elementor page ID **161**, container `86e313d`)

### Structure
Full-width column on **black** background, centered text stack:
1. Tagline (ZH): “数易赋能，您的人生导航”
2. Headline (EN): “We Don't Just Guide — We Empower You to Understand Yourself and Others.”
3. CTA button → anchor `#12`

### Typography (from post-161.css)
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Tagline (`bbc16cb`) | Work Sans | 14px | 600 | `#FFFFFF` |
| Headline (`b9b35d0`) | Work Sans | 45px / 24px mobile | 600 | `#FFFFFF` |
| Line height (headline) | — | 50px / 32px mobile | — | — |
| Headline max width | 38% desktop, 100% tablet/mobile | | | |

### CTA button (`f4f9058`)
- Text: **请改变自己吧**
- Background: `#FFC107`
- Text: `#FFFFFF`
- Font: **Azeret Mono**, 12px, weight 500
- Border-radius: **30px**
- Link: `href="#12"` (scroll to app-download section)
- Animation: `fadeInUp`, delay 1000ms, class `animated-slow`

### Hero animations
- All hero text/button: `elementor-invisible` → `fadeInUp` on scroll/viewport
- Delays: 100ms, 400ms, 1000ms

### Below hero
Three-column image row with **motion FX translateY** parallax on outer columns; images have 30px border-radius.

---

## 4. Footer (`elementor-location-footer`, post ID **199**)

### Top section
- Large heading: **联系我们** — Work Sans, **120px** (50px mobile), white, centered
- 3-column row:
  1. Contact info (25%): email `support@kccdigital.com`, placeholders “Contact Pending”, “Address Pending”
  2. Vertical nav (25%): 产品服务, 关于我们, 联系我们
  3. White card form (50%): contact form with Name/Phone/Email/Message, **SUBMIT** button

### Footer nav — primary (vertical)
- 产品服务 → `/portfolio/`
- 关于我们 → `/about-us/`
- 联系我们 → `/contact-us/`

### Footer nav — legal (horizontal)
- 无障碍声明 → `/accessibility-statement/`
- 隐私政策 → `/privacy-policy/`
- 使用条款 → `/使用条款/`
- 退款政策 → `/refund-policy/`
- 配送政策 → `/shipping-policy/`

### Contact form card
- Background: `#FFFFFF`, border-radius 20px, padding 50px
- Labels: Work Sans 14px 600 black
- Fields: Azeret Mono 12px, bottom border only (`1px #000`)
- Submit: black bg `#000000`, white text, radius 50px

### Copyright
```html
© 2035 by <a href="https://www.wix.com/studio">数易赋能</a>
```
- Font: Azeret Mono 12px, white, right-aligned (center on mobile)
- Note: Wix Studio link is likely template leftover

### Footer link hover
- Nav: underline pointer animation (`e--pointer-underline`, `e--animation-fade`)
- Email link accent: `#FFC107` (overridden in custom CSS for dark mode)

---

## 5. Color Palette (site-specific overrides)

| Token / usage | Hex | Notes |
|---------------|-----|-------|
| Primary background | `#000000` | Header, hero, many sections |
| Primary text | `#FFFFFF` | On dark backgrounds |
| Accent / CTA / cart bubble | `#FFC107` | Amber/gold buttons, links, cart qty |
| Accent hover (some CTAs) | `#FF4E27` | Orange section bg, mobile cart icon |
| Dark mode accent | `#003ef8` | Replaces amber when `.darkmode--activated` |
| Section highlight | `#FF4E27` | e.g. app promo band |
| Secondary gray icon | `#CDCDCD` | Icon boxes |
| Form/card white | `#FFFFFF` | Footer form, testimonial section |
| Body text on white | `#000000` | Testimonials carousel |
| Muted text | `#7A7A7A` | Elementor kit global text |
| Scrollbar track | `#f0f0f0` | Inline body scrollbar CSS |
| Scrollbar thumb | `#dfdbdb` | Inline body scrollbar CSS |
| Theme-color meta | `#2b2b2b` | Browser chrome |
| WooCommerce checkout CTA | `#ffc107` | Place order, account nav |
| Filter button | `#d9534f` | Product filters |
| Purple swatch | `#cab4e7` | Product variation |

Elementor kit globals (mostly overridden on page): primary `#6EC1E4`, accent `#61CE70`.

---

## 6. Typography

| Role | Family | Fallback |
|------|--------|----------|
| Display / headings | **Work Sans** | Sans-serif |
| UI / mono accents | **Azeret Mono** | Sans-serif |
| WooCommerce cart product name | Roboto | Sans-serif |
| Elementor kit default | Roboto / Roboto Slab | — |
| Shop sort dropdown (custom) | Courier New | monospace |

Google fonts loaded via OMGF (`elementor-gf-roboto`).

---

## 7. Animation & Motion Hints

### Elementor entrance animations
- `fadeInUp` — dominant; used on hero, sections, icon boxes (staggered delays 100–600ms)
- `fadeInLeft` / `fadeInRight` — split columns (app section, partner logos)
- `animated-slow` — longer duration variant
- Initial state: `elementor-invisible`

### Elementor Motion FX
- `motion_fx_translateY` — scroll parallax on hero side images (speed 4px)
- `background_motion_fx_translateY` — parallax bg on section `#12` (speed 6.1px)
- `motion_fx_tilt_effect` — mouse tilt on portfolio preview block (speed 0.9)

### Happy Addons (`ha_*`)
- Keyframes: `ha_fadeIn`, `ha_zoomIn`, `ha_rollIn`, `ha_bounce`, etc. (in elementor-frontend-inline-css)

### Royal Elementor Addons (`wpr-*`)
- Classes: `wpr-particle-no`, `wpr-jarallax-no`, `wpr-parallax-no`, `wpr-sticky-section-no`
- Text animations CSS loaded: `wpr-text-animations-css`

### Carousels
- **Nested carousel** (`elementor-widget-n-carousel`) + Swiper v8
- Testimonials: autoplay 5000ms, bullets + arrows, hover accent `#FF4E27`

### Popups
- Login popup ID **3802**: entrance/exit `fadeIn`, duration 1.2s

### Dark mode plugin (`darkmodetg`)
- Toggle adds `.darkmode--activated` on `<html>` or elements
- `.dmt-filter-0` / `.dmt-filter-1` — exclude elements from invert filter
- Page fade: `html.dmtg-fade`

---

## 8. WordPress / Elementor Structure

### Theme & plugins
- Theme: **Hello Elementor** 3.4.9
- **Elementor** 4.2.2 + **Elementor Pro** 3.32.2
- **WooCommerce** 11.0.1
- **Happy Elementor Addons** 3.23.1
- **Royal Elementor Addons** 1.7.1034
- **Easy Login WooCommerce** (xoo-el) 2.9.6
- **Dark Mode Toggle** (darkmodetg)
- **Filter Everything**, **WPC Buy Now Button**, **Pojo Accessibility**, Bootstrap 5.3.3

### Elementor template IDs
| ID | Type | Usage |
|----|------|-------|
| 4 | Kit | Global colors/typography (partially used) |
| 187 | Header | Site-wide header |
| 199 | Footer | Site-wide footer |
| 161 | Page | Homepage |
| 163 | Page | About Us |
| 165 | Page | Portfolio / 产品服务 |
| 167 | Page | Contact Us |
| 2035 | Page | Shopping (shop archive template) |
| 3802 | Popup | Login/signup modal |

### Page content patterns
- All inspected pages share same header/footer templates
- Inner pages use `data-elementor-type="wp-page"` with page-specific IDs
- WooCommerce shop uses Elementor products widget + standard WC product loop

---

## 9. Key Subpages Summary

### `/about-us/` (page 163)
- Sections: 我们的故事, values/mission accordion-style headings, OUR TEAM, 合作伙伴
- Large bilingual headings (ZH + EN caps labels)

### `/contact-us/` (page 167)
- Minimal: brand heading, support message, email + Mountain View CA address in heading widgets

### `/portfolio/` (page 165)
- Grid of 4 services: 数字生命, 姓名学, 塔罗占卜, 东方占卜术
- Each links to `/number`, `/name`, `/tarot`, `/eastern-divination`

### `/shopping/` (Elementor 2035 + WC)
- 3 products, default WC sorting dropdown
- Product cards: image, title, price, Add to cart / Buy now / Select options
- Custom CSS: monospace underlined white sort label, `#ffc107` buttons

---

## 10. Login Modal (sitewide overlay)

Easy Login WooCommerce popup (also triggered from footer area on some pages):
- Tabs: Login | Sign Up
- Submit button: `#000000` bg, white text (overridden to `#ffc107` in places)
- Active tab/button override: `#ffc107`
- Max modal width: 800px; slider style transform `translateX(800px)`
- Sidebar bg image: product hero AVIF

---

## Files in this folder

| File | Description |
|------|-------------|
| `homepage.html` | Full homepage HTML |
| `about-us.html`, `contact-us.html`, `portfolio.html`, `shopping.html` | Subpage HTML |
| `post-161.css`, `post-187.css`, `post-199.css` | Elementor compiled page CSS |
| `post-4-global-kit.css` | Elementor global kit variables |
| `elementor-gf-roboto.css` | Hosted Google font subset |
| `header-excerpt.html`, `hero-excerpt.html`, `footer-excerpt.html` | Trimmed structural snippets |
| `colors-fonts.css` | Extracted color/font rules for diffing |
