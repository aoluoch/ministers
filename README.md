# Young Ministers Movement

Marketing website for the Young Ministers Movement — raising ministers of the gospel who are fully equipped to operate and minister the gospel globally.

Built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, and **React Router**.

Content lives in **Contentful**. Editors: follow [`CONTENTFUL.md`](CONTENTFUL.md) for a page-by-page, step-by-step guide to changing copy and images.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Add Contentful Content Delivery API credentials to `.env` for page content:

```env
VITE_SITE_URL=https://youngministers.org
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_cda_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

`VITE_SITE_URL` is the canonical production origin used for canonical tags, Open Graph/Twitter URLs, `sitemap.xml`, and `robots.txt`. It defaults to `https://youngministers.org` when unset — set it in your host's environment variables if the domain changes.

Fetchers and field adapters live in [`src/lib/contentful/`](src/lib/contentful/). If the Contentful env vars are missing, the app returns empty page sections instead of using local copy.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## Pages & routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/journey` | The Four Bs development journey |
| `/programs` | Events list (summaries) |
| `/programs/:slug` | Event detail (description, highlights, photos) |
| `/get-involved` | Ways to get involved |
| `/contact` | Contact & socials |
| `/faq` | FAQ |
| `*` | 404 (`noindex`, excluded from the sitemap) |

## SEO

`npm run build` generates production SEO artefacts into `dist/` via [`seo/plugin.ts`](seo/plugin.ts):

| Output | Notes |
|--------|-------|
| `dist/sitemap.xml` | All public pages + one URL per **published** Contentful program. Generated automatically — never hardcoded. |
| `dist/robots.txt` | Allows public crawling, blocks private paths and tracking-parameter duplicates, references the sitemap. |
| `dist/<route>/index.html` | A copy of the shell per public route with that route's real `<title>`, description, canonical, OG/Twitter tags and JSON-LD injected, so crawlers that do not run JS still read correct metadata. |
| `dist/404.html` | `noindex, follow`, no canonical, never in the sitemap. |

At runtime [`<Seo>`](src/components/seo/Seo.tsx) keeps the same tags in sync during client-side navigation. Shared, isomorphic definitions live in [`src/lib/seo/`](src/lib/seo/):

- `pages.ts` — public page list, canonical URL helpers, Contentful image helpers
- `schema.ts` — `WebSite`, `Organization`, `BreadcrumbList`, `Event`, `ItemList`, `FAQPage`, `Service`
- `routes.ts` — route → metadata + JSON-LD graph

To add a public page: add it to `STATIC_PAGES` in `src/lib/seo/pages.ts`, add the route in `src/App.tsx`, and render `<Seo {...staticPageSeo('/new-path', SITE_URL)} />` in the page. Event pages are picked up automatically from Contentful.

Verify locally (both are served by dev **and** preview):

```bash
npm run build && npm run preview
curl -i http://localhost:4173/sitemap.xml
curl -i http://localhost:4173/robots.txt
```

Hosting: [`netlify.toml`](netlify.toml), [`vercel.json`](vercel.json), and [`public/_redirects`](public/_redirects) serve real files first, fall back to the SPA shell for `/programs/*` (so events published after the last build still render), and return a real HTTP 404 for anything else.

### Example event routes

- `/programs/young-ministers-summit-2026`
- `/programs/young-ministers-classes`

## Registration flow

1. Site-wide **Join the Movement** buttons go to **`/get-involved`**.
2. Event detail CTAs come from Contentful program fields (`registerCtaLabel` and `registerCtaHref`).

Configure the site-wide marketing destination in [`src/content/site.ts`](src/content/site.ts) (`registerCtaHref`).

## Social links

Instagram, Facebook, and TikTok icons appear in the **navbar**, **footer**, and **contact** page. URLs live in [`src/content/site.ts`](src/content/site.ts) and open in a new tab. Shared UI: [`src/components/SocialLinks.tsx`](src/components/SocialLinks.tsx).

## Project structure

```
src/
  components/
    layout/       Header, footer, page shell, scroll reveal
    sections/     Page sections (hero, events, FAQ, CTAs, …)
    ui/           shadcn primitives (Button, Accordion, Sheet, …)
    SocialLinks.tsx
  content/        Site chrome config (nav, logo, footer, socials)
  pages/          Route-level page composition
  types/          Content prop interfaces
  lib/            Utilities + Contentful fetchers/mappers
public/
  logo1.png       Brand logo
```

## Content architecture (Contentful)

Pages load content via React Router loaders → `src/lib/contentful` fetchers. Page copy is CMS-owned. When a content type is missing, that section renders nothing so you can add types in Contentful gradually.

Full editor guide: [`CONTENTFUL.md`](CONTENTFUL.md).

| Source | Content |
|--------|---------|
| Home section singletons (`heroSection`, `homeTextBlock`, etc.) | Home page sections |
| `journeyPillar` + `journeyPage` | Four Bs on Home and `/journey` |
| `chapter` + `globalPresence` | Nations and chapter leaders |
| About section singletons (`aboutTextblock`, `aboutMission`, etc.) | About page sections |
| `communityGroup` + `trainingTopic` | Journey page community + curriculum |
| `programs` + `programsPage` | Programs list + detail |
| `getInvolved` + `getInvolvedPage` | Get Involved |
| `contact`, `faq` + `faqPage` | Contact and FAQ |
| `src/content/site.ts` | Nav, logo, footer, socials |

Section components stay presentational — adapters map Contentful fields → [`src/types/content.ts`](src/types/content.ts).

## Brand

| Token | Hex | Role |
|-------|-----|------|
| Navy | `#1a264e` | Primary surfaces, hero, footer (`brand-purple` in CSS) |
| Deep navy | `#10182f` | Darker surfaces |
| Gold | `#c9a574` | Accents (`brand-peach` in CSS) |
| Beige | `#e8d4b8` | Gradient midpoint |
| Cream | `#fce8cf` | Light text on navy |

CSS utilities: `bg-summit-gradient`, `text-summit-gradient`, `btn-summit-gradient`.

Fonts: **Montserrat** (display), **Playfair Display** (italic quotes / Four Bs), **Source Sans 3** (body).

## Placeholders to replace later

- Phone number in `src/content/site.ts`
- Any remaining site chrome that should move into Contentful later
