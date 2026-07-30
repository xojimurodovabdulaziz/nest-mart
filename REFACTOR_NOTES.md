# NestMart refactor — Phase 1

Scope of this pass: **foundation + highest-traffic surfaces**, not every
file. All routes, auth, API calls (`src/api/*`), and business logic in
`context/*` are untouched. Nothing was renamed at the URL/route level.

## What changed

**Design tokens** — `src/styles/tokens.css` (new)
Formalizes the palette/spacing/radius/shadow/motion values that were
already in use (brand green `#2e7d32`, amber `#f59e0b`, etc.) into CSS
custom properties, with a `[data-theme="dark"]` override block that
plugs into the existing `ThemeContext`/`dark-theme.css` system. New or
touched components should read from these instead of hardcoding hex
values — e.g. `var(--color-brand-500)`, `var(--space-4)`, `var(--radius-lg)`.

**Global base** — `src/index.css`
Mobile-first reset, now token-driven. Added: a skip-to-content link
(`.skip-link`, wired up in `Layout.tsx` with a `<main id="main-content">`
landmark), a consistent `:focus-visible` ring for keyboard users only,
and a token-driven scrollbar.

**Reusable primitives** — `src/components/ui/`
- `Button` — variants (`primary` / `secondary` / `outline` / `ghost` /
  `danger`), sizes (`sm` / `md` / `lg`), loading state. Currently used in
  `ProductCard`'s "Add" button as the reference implementation.
- `Badge` — replaces the four near-duplicate discount/sale/new/hot badge
  blocks that lived in `ProductBadges.css` with one component + tone prop.

**Code-splitting** — `src/App.tsx`
All 17 routes now load via `React.lazy`, wrapped in a `Suspense` +
`PageLoader` fallback. Previously every page — including the admin
dashboard and vendor panel — shipped in the initial bundle a shopper
downloads just to view the homepage. This is the single biggest
performance win available without touching page internals.

**ProductCard + Header** — token-ified colors, `aria-pressed`/clearer
`aria-label`s on the wishlist toggle, 2-line clamp on product names so
uneven titles don't break card rhythm, dark-mode fix for two dropdown
surfaces (search suggestions, search category menu) that had no dark
styling before.

## Conventions for continuing this

- Pull colors/spacing/radius/shadow from `tokens.css`, don't add new hex values.
- Reach for `Button`/`Badge` before writing a new one-off styled button/pill.
- Keep the existing breakpoint values (480 / 700 / 900–1024 / 1200) —
  they're already used consistently and some of the show/hide logic
  between `NavBar`/`TopBar`/`BottomNav` is deliberate (see comments in
  `MainBar.css` and `NavBar.css`).
- Preserve the `container` class / `--container-max` (1610px) rather than
  introducing a second max-width system.

## Suggested Phase 2 (not started)

Roughly in priority order for an ecommerce app:
1. **Cart & ProductDetail pages** — highest-intent, highest-revenue-impact screens.
2. **Home page sections** (Hero, DealsOfTheDay, ShopByCategories, PromoBanners) — apply the token system, add `Reveal`-based scroll-in (component already exists), audit image sizes for CLS.
3. **Forms** (`Register`, `Contact`, `BecomeVendor`, `FormInput`) — consolidate on one input component, add inline validation states.
4. **AdminDashboard / VendorPanel** — lowest traffic, highest internal complexity; worth a dedicated pass since they likely have their own data-table patterns.
5. Sweep remaining component CSS files for hardcoded hex → tokens (grep for `#` in `src/components/**/*.css` to find what's left).
6. Bundle audit: after code-splitting lands, check chunk sizes (`vite build` produces a manifest) and consider `vite-plugin-compression` or route prefetching on hover for nav links.

This file is meant to be updated as later phases land — treat it as a running log, not a one-time note.

---

## Phase 2

**App-wide token migration** — ran an automated pass mapping ~100 hardcoded
hex colors (greens, reds, ambers, grays already in consistent use) to the
`tokens.css` custom properties, across **79 CSS files** in `src/pages` and
`src/components`. This is the biggest single lever for "consistent design
system" — every card, badge, and button border now resolves through the
same palette and gets dark-mode support for free. Deliberately left `#fff`
alone where automation couldn't tell background-white from text-white; a
few instances were fixed by hand where they mattered (see Profile below).

**Cart** (`src/pages/Cart/`) — full redesign. Sticky order-summary sidebar
on desktop, dashed subtotal divider, richer empty state with icon, secure-
checkout note. Added a **quantity stepper directly in the cart** (+/−,
matching the pattern already used in `ProductCard`) by wiring up
`CartContext.addToCart` in a place it wasn't used before — no new API,
reuses what `ProductCard` already calls. Item removal now has an exit
animation instead of an instant pop. Responsive down to 340px.

**Profile** — fixed a dark-mode gap: `.profile-hero` used a hardcoded
`#fff` background that the class-pattern dark-theme matcher (`[class*="-card"]`
etc.) didn't catch, so the hero card stayed white in dark mode. Same fix
applied to a couple of dropdown surfaces in `SearchBar.css` during the
Header pass.

**Contact** — this page had the clearest "unfinished" markers:
- `.contact-location-card` had **no background/border/padding at all** —
  three contact cards were rendering as unstyled floating text. Added the
  actual card container styling.
- Copy was a mix of English UI text and Uzbek body copy (`ContactHelp`
  was lorem ipsum with an English "How can help you?" eyebrow; the
  location cards said "Phone:" / "Email:" / "View map" in English; the
  form said "Drop Us a Line" / "First Name"). Rewrote all of it in Uzbek
  to match the rest of the site.
- The map/location data pointed at a placeholder US address
  ("5171 W Campbell Ave, Kent, Utah") and `contact@evara.com` — a
  leftover from whatever template this started from. Replaced with
  Tashkent locations and `sale@nest.com` (matching the address already
  used in `ContactForm`'s mailto action).
- Added focus states and hover-lift to the contact cards/inputs to match
  the interaction language used elsewhere (Button, ProductCard).

**About** — every heading and label was in English ("Welcome to Nest",
"What We Provide?", "Read more", feature titles, stat labels, team roles)
while all body paragraphs were Uzbek. Localized all of it — `aboutData.ts`
titles/labels and every heading in `About.tsx`.

**NewsletterBanner** — same issue, entire component was in English
despite calling a real API (`subscribeNewsletter`). Localized copy only;
logic untouched.

**Global overflow safety** — added to `index.css`: `html, body { max-width: 100vw }`
and `overflow-wrap`/`word-break` on text elements, so long unbroken
strings (emails, order IDs) can't force horizontal scroll on very narrow
screens. Audited `Compare.css` and admin dashboard list components
specifically for the 300–380px range — both already used `fr`-based
grids and `min-width: 0` + ellipsis correctly, no changes needed there.

### What's genuinely done vs. what's still pending

**Deep-redesigned this round:** Cart, Profile (targeted fix), Contact, About, NewsletterBanner.

**Token-migrated for consistency but not yet given a full visual pass:**
AdminDashboard (+ its 9 sub-widgets), VendorPanel (+ its sub-widgets),
Blog, BlogPost, Deals, Categories, Wishlist, Compare, BecomeVendor,
Register, Login, NotFound, ProductDetail (+ its 20+ sub-components), and
the remaining Home page sections (Hero, ShopByCategories, DealsOfTheDay,
PromoBanners, RecentlyViewed). These already inherit the token system and
were spot-checked for responsive breakpoints, but haven't had the same
line-by-line copy/layout audit as the pages above.

Given the size of this codebase (230 files), doing that same depth of pass
— missing-container bugs, language consistency, spacing/shadow polish,
micro-interactions — on all of the above in one sitting isn't realistic
without it becoming shallow. Suggested next targets, in order: AdminDashboard
(internal-facing but highest complexity), ProductDetail (highest page-view
count after Home), then the remaining content pages.

