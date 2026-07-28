# Young Ministers' Summit

Marketing site for the Young Ministers' Summit — React, TypeScript, Tailwind CSS, and shadcn/ui.

## Quick start

```bash
npm install
cp .env.example .env
# Add your Google Form URL to .env
npm run dev
```

## Registration CTAs

Site-wide “Register for the Summit” buttons go to **`/programs`** so visitors can read about the Summit first.

The Summit event detail page (`/programs/young-ministers-summit-2026`) can still use a Google Form for actual signup:

```env
VITE_REGISTER_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
```

Create the form yourself, paste the share URL into `.env`, and restart the dev server. Until that value is set, the event-page form link falls back to `#`.

## Content architecture (Contentful-ready, no references)

Content lives in typed modules under `src/content/`. Each page exports a plain object whose keys match section props. Section components are presentational only — they receive a self-contained props object and never resolve linked entries.

| Today | Later (Contentful) |
|-------|--------------------|
| `src/content/home.ts` etc. | One content type per page (`homePage`, `aboutPage`, …) |
| `src/content/programs.ts` events array | Each event is one self-contained entry (summary + detail + photos inline). List page and `/programs/:slug` read the same object — **no linked Event references** |
| Nested fields / JSON on the page entry | Same prop shapes; **no Entry reference fields** between CTAs, quotes, leaders, or sections |
| `src/content/site.ts` | Single `siteSettings` entry fetched once in the layout |
| Native image path `/ymlogo.jpg` | Contentful Asset field on the settings/page entry (not a linked “Media” content type) |

Pages compose sections explicitly:

```tsx
<HeroSection {...homeContent.hero} />
```

To migrate: replace the content import with a fetch that returns the same TypeScript shapes in `src/types/content.ts`. No reference resolution layer is required.

## Brand tokens

| Token | Hex |
|-------|-----|
| Purple | `#6E2D77` |
| Peach | `#ECB378` |
| Beige | `#F3D3B3` |
| Cream | `#FFF1E4` |

Gradient utility: `bg-summit-gradient` / `text-summit-gradient`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview the production build
# ministers
