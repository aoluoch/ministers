# Young Ministers' Summit

Marketing website for the Young Ministers' Summit — a community that mentors, equips, and walks with young ministers of the gospel.

Built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, and **React Router**.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Add Contentful Content Delivery API credentials to `.env` for page content:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_cda_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

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
| `/programs` | Events list (summaries) |
| `/programs/:slug` | Event detail (description, highlights, photos) |
| `/get-involved` | Ways to get involved |
| `/contact` | Contact & socials |
| `/faq` | FAQ |

### Example event routes

- `/programs/young-ministers-summit-2026`
- `/programs/young-ministers-classes`

## Registration flow

1. Site-wide **Register for the Summit** buttons go to **`/programs`** so visitors can read about events first.
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
  ymlogo.jpg      Brand logo
```

## Content architecture (Contentful)

Pages load content via React Router loaders → `src/lib/contentful` fetchers. Page copy is CMS-owned; there are no local page-content modules. When Contentful is unavailable, loaders return empty typed section objects so components can safely render nothing.

| Source | Content |
|--------|---------|
| Home section singletons (`heroSection`, `homeTextBlock`, etc.) | Home page sections |
| About section singletons (`aboutTextblock`, `aboutMission`, etc.) | About page sections |
| `programs` entries | Programs list + detail |
| `getInvolved`, `contact`, `faq` entries | Get Involved, Contact, FAQ pages |
| `src/content/site.ts` | Nav, logo, footer, socials |
| Asset fields on the same entry | Cover images + event gallery photos |

Section components stay presentational — adapters map Contentful fields → [`src/types/content.ts`](src/types/content.ts). No entry-reference resolution.

## Brand

| Token | Hex | Role |
|-------|-----|------|
| Purple | `#6E2D77` | Primary surfaces, hero, footer |
| Peach | `#ECB378` | Gradient start, accents |
| Beige | `#F3D3B3` | Gradient midpoint |
| Cream | `#FFF1E4` | Light backgrounds, text on purple |

CSS utilities: `bg-summit-gradient`, `text-summit-gradient`, `btn-summit-gradient`.

Fonts: **Plus Jakarta Sans** (display) and **Source Sans 3** (body).

## Placeholders to replace later

- Phone number in `src/content/site.ts`
- Any remaining site chrome that should move into Contentful later
