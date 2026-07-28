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

## Content architecture (Contentful-ready)

Content is typed modules under `src/content/`. Section components are presentational only — each receives a **self-contained props object**. There are **no cross-entry references** to resolve later in Contentful.

| Today | Later (Contentful) |
|-------|--------------------|
| `src/content/home.ts`, `about.ts`, … | One content type per page |
| `src/content/programs.ts` `events` array | Each event is one self-contained entry (summary + detail + photos inline) |
| `src/content/site.ts` | Single `siteSettings` entry for nav, socials, register URLs |
| `/ymlogo.jpg` and event photos in `public/` | Native Contentful Asset fields on the same entry |

Pages compose sections explicitly:

```tsx
<HeroSection {...homeContent.hero} />
```

Events work the same way — list and detail pages read the same `EventItem` object by `slug` (`getEventBySlug`). Add photos by placing files in `public/` and filling the event’s `photos` array in [`src/content/programs.ts`](src/content/programs.ts).

To migrate to Contentful: fetch data into the shapes in [`src/types/content.ts`](src/types/content.ts) and swap the content imports. No reference-resolution layer is required.

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
