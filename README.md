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

Optional — set a Google Form URL in `.env` for signup on the Summit event detail page:

```env
VITE_REGISTER_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
```

Optional — Contentful Content Delivery API (falls back to `src/content/*` when unset):

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_cda_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

See [`CONTENTFUL.md`](CONTENTFUL.md) for the content model. Fetch + adapters live in [`src/lib/contentful/`](src/lib/contentful/).

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
2. On the Summit event detail page, the register CTA uses `VITE_REGISTER_FORM_URL` (Google Form). If unset, that link falls back to `#`.

Configure the marketing destination in [`src/content/site.ts`](src/content/site.ts) (`registerCtaHref`). Configure the form URL via env / `getRegisterFormUrl()`.

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
  content/        Typed page + site content (CMS-ready)
  pages/          Route-level page composition
  types/          Content prop interfaces
  lib/            Utilities + register URL helper
public/
  ymlogo.jpg      Brand logo
```

## Content architecture (Contentful)

Pages load content via React Router loaders → `src/lib/contentful` fetchers. When Contentful env vars are missing (or a request fails), fetchers fall back to typed modules under `src/content/`.

| Source | Content |
|--------|---------|
| `homePage`, `aboutPage`, … singletons | Page copy |
| `event` entries (queried by type / slug) | Programs list + detail |
| `src/content/site.ts` | Nav, footer, socials (not in Contentful yet) |
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
- Founder bio on the About / leadership content
- Event photos (`photos` arrays are empty with “coming soon” notes)
- `VITE_REGISTER_FORM_URL` when your Google Form is ready
