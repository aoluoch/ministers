# Contentful content model (Free plan)

Designed for the **Contentful Free / Starter** space limits:

- **25 content types max** — this model uses **7**
- **10,000 records** (entries + assets)
- Prefer **no Entry reference / Link fields** (matches the site architecture and avoids free-plan reference limits)
- Repeating blocks use **JSON Object** fields (or Long text with clear separators)
- Images use **Media (Asset)** fields on the **same entry** — not a separate “Media item” content type linked by reference

Navbar and footer are **out of scope** here (keep them in code or a future `siteSettings` entry).

---

## How the React app should consume this

| Website source today | Contentful source later |
|----------------------|-------------------------|
| `src/content/home.ts` | Fetch singleton `homePage` |
| `src/content/about.ts` | Fetch singleton `aboutPage` |
| `src/content/programs.ts` list copy | Fetch singleton `programsPage` |
| `src/content/programs.ts` `events[]` | Query all `event` entries (by content type + optional `order`) |
| `src/content/get-involved.ts` | Fetch singleton `getInvolvedPage` |
| `src/content/contact.ts` | Fetch singleton `contactPage` |
| `src/content/faq.ts` | Fetch singleton `faqPage` |

**Rule:** each page component still receives the same props shapes as in `src/types/content.ts`. Map Contentful fields → those props in one adapter per page. Do **not** resolve linked entries.

**Singleton pages:** create **one** published entry per page content type (e.g. one `homePage` entry). Fetch with `limit: 1` or by a known entry ID.

---

## Content type inventory (7 total)

1. `homePage`
2. `aboutPage`
3. `programsPage`
4. `event`
5. `getInvolvedPage`
6. `contactPage`
7. `faqPage`

---

## Shared field conventions (not separate content types)

Use these **inline** on every page — never as linked “CTA” or “Quote” entries.

### CTA (two Short text fields)

| Field ID | Type | Example |
|----------|------|---------|
| `*_ctaLabel` | Short text | `Register for the Summit` |
| `*_ctaHref` | Short text | `/programs` or Google Form URL |

### Paragraph list

Prefer **Long text**: one paragraph per blank-line-separated block. In code, `split(/\n\n+/)` → `string[]`.

Alternatively one **JSON Object** field:

```json
["Paragraph one…", "Paragraph two…"]
```

### Tone (CTA banners)

| Field ID | Type | Validation |
|----------|------|------------|
| `*_tone` | Short text | Enum: `purple`, `cream` |

---

# 1. Home — `homePage`

**API ID:** `homePage`  
**Entries:** 1  
**Maps to:** `HomePage` → `HeroSection`, `TextBlock`, `ExploreLinks`, `TrackRecord`, `Testimonials`, `CtaBanner`

## Section A — Hero (`HeroSection`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Hero brand name | `heroBrandName` | Short text | Yes | `hero.brandName` |
| Hero headline | `heroHeadline` | Short text | Yes | `hero.headline` |
| Hero body | `heroBody` | Long text | Yes | `hero.body` |
| Hero supporting line | `heroSupportingLine` | Short text | Yes | `hero.supportingLine` |
| Hero CTA label | `heroCtaLabel` | Short text | Yes | `hero.primaryCta.label` |
| Hero CTA href | `heroCtaHref` | Short text | Yes | `hero.primaryCta.href` → usually `/programs` |

## Section B — What We're About (`TextBlock`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| About title | `aboutTitle` | Short text | Yes | `about.title` |
| About paragraphs | `aboutParagraphs` | Long text *or* JSON Object | Yes | `about.paragraphs` |
| About quote | `aboutQuote` | Short text | No | `about.quote` |

## Section C — Explore (`ExploreLinks`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Explore title | `exploreTitle` | Short text | Yes | `explore.title` |
| Explore items | `exploreItems` | **JSON Object** | Yes | `explore.items` |

**JSON shape for `exploreItems`:**

```json
[
  {
    "title": "Our Programs",
    "description": "From the annual Summit to quarterly classes…",
    "href": "/programs",
    "linkLabel": "View programs"
  },
  {
    "title": "Get Involved",
    "description": "Attend, volunteer, partner…",
    "href": "/get-involved",
    "linkLabel": "Ways to join"
  },
  {
    "title": "Past & Upcoming Events",
    "description": "See what's coming next…",
    "href": "/programs",
    "linkLabel": "See events"
  }
]
```

## Section D — Track Record (`TrackRecord`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Track record title | `trackRecordTitle` | Short text | Yes | `trackRecord.title` |
| Track record paragraphs | `trackRecordParagraphs` | Long text *or* JSON Object | Yes | `trackRecord.paragraphs` |
| Track record quote | `trackRecordQuote` | Short text | Yes | `trackRecord.quote` |

## Section E — In Their Words (`Testimonials`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Testimonials title | `testimonialsTitle` | Short text | Yes | `testimonials.title` |
| Testimonial quotes | `testimonialQuotes` | **JSON Object** | Yes | `testimonials.quotes` |
| Testimonial story | `testimonialStory` | Long text | Yes | `testimonials.story` |

**JSON shape for `testimonialQuotes`:**

```json
[
  { "quote": "This isn't a conference. It's a forum that's here to stay." },
  { "quote": "Healed ministers make honest ministers." },
  { "quote": "No sermons here — just real stories, real wounds, real growth." }
]
```

## Section F — Ready CTA (`CtaBanner`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Ready CTA title | `readyCtaTitle` | Short text | Yes | `readyCta.title` |
| Ready CTA body | `readyCtaBody` | Long text | No | `readyCta.body` |
| Ready CTA primary label | `readyCtaPrimaryLabel` | Short text | Yes | `readyCta.primaryCta.label` |
| Ready CTA primary href | `readyCtaPrimaryHref` | Short text | Yes | `readyCta.primaryCta.href` → `/programs` |
| Ready CTA tone | `readyCtaTone` | Short text | No | `readyCta.tone` (`purple` / `cream`) |

**Home field count:** ~20 fields on one entry — stays well under Contentful’s per-type field limits.

---

# 2. About — `aboutPage`

**API ID:** `aboutPage`  
**Entries:** 1  
**Maps to:** `AboutPage` → `TextBlock`, `MissionBlock`, `BeliefsList`, `DifferenceBlock`, `LeadershipList`, `CtaBanner`

## Section A — Why We Exist (`TextBlock`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Why title | `whyTitle` | Short text | Yes | `whyWeExist.title` |
| Why paragraphs | `whyParagraphs` | Long text *or* JSON Object | Yes | `whyWeExist.paragraphs` (many paragraphs) |

## Section B — Mission (`MissionBlock`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Mission title | `missionTitle` | Short text | Yes | `mission.title` |
| Mission body | `missionBody` | Long text | Yes | `mission.body` |

## Section C — Beliefs (`BeliefsList`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Beliefs title | `beliefsTitle` | Short text | Yes | `beliefs.title` |
| Beliefs intro | `beliefsIntro` | Long text | Yes | `beliefs.intro` |
| Beliefs list | `beliefsList` | **JSON Object** | Yes | `beliefs.beliefs` |

**JSON shape for `beliefsList`:**

```json
[
  { "title": "Christ First", "description": "Everything begins and ends with Him." },
  { "title": "Biblical Truth", "description": "Our foundation, not a footnote." },
  { "title": "Integrity", "description": "Who you are matters as much as what you carry." },
  { "title": "Character before Charisma", "description": "Gifting can open doors…" },
  { "title": "Excellence", "description": "In how we serve, teach, and lead." },
  { "title": "Servant Leadership", "description": "Leading by serving first." },
  { "title": "Discipleship", "description": "Growth that goes deeper than information." },
  { "title": "Generational Impact", "description": "Ministers who finish well…" }
]
```

## Section D — What Makes Us Different (`DifferenceBlock`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Difference title | `differenceTitle` | Short text | Yes | `difference.title` |
| Difference paragraphs | `differenceParagraphs` | Long text *or* JSON Object | Yes | `difference.paragraphs` |
| Difference quotes | `differenceQuotes` | **JSON Object** | Yes | `difference.quotes` |

**JSON shape for `differenceQuotes`:**

```json
[
  "We raise ministers, not attendees.",
  "Discipleship doesn't end when the event does."
]
```

(If you prefer objects: `[{ "text": "…" }]` — keep one shape and stick to it in the adapter.)

## Section E — Leadership (`LeadershipList`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Leadership title | `leadershipTitle` | Short text | Yes | `leadership.title` |
| Leaders | `leaders` | **JSON Object** | Yes | `leadership.leaders` |

**JSON shape for `leaders`:**

```json
[
  {
    "role": "Founder",
    "name": "Apostle Dr. David Owusu",
    "bio": "Bio to be added."
  },
  {
    "role": "General Secretary",
    "name": "Pastor Bonny Kihiko",
    "affiliation": "Kratos Church International"
  }
]
```

Optional keys: `affiliation`, `bio`. **Do not** create a separate `person` content type on free tier.

## Section F — Join CTA (`CtaBanner`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Join title | `joinCtaTitle` | Short text | Yes | `joinCta.title` |
| Join body | `joinCtaBody` | Long text | No | `joinCta.body` |
| Join primary label | `joinCtaPrimaryLabel` | Short text | Yes | `joinCta.primaryCta.label` |
| Join primary href | `joinCtaPrimaryHref` | Short text | Yes | `joinCta.primaryCta.href` → `/programs` |
| Join secondary label | `joinCtaSecondaryLabel` | Short text | No | `joinCta.secondaryCta.label` |
| Join secondary href | `joinCtaSecondaryHref` | Short text | No | `joinCta.secondaryCta.href` |
| Join tone | `joinCtaTone` | Short text | No | `joinCta.tone` |

---

# 3. Programs list — `programsPage`

**API ID:** `programsPage`  
**Entries:** 1  
**Maps to:** `ProgramsPage` → `EventList` **page chrome only** (title, intro, footer).  
**Events themselves** come from the `event` content type (see below) — fetched by query, **not** referenced from this entry.

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| List title | `title` | Short text | Yes | `list.title` |
| List intro | `intro` | Long text | Yes | `list.intro` |
| Footer note | `footerNote` | Long text | No | `list.footerNote` |
| Footer CTA label | `footerCtaLabel` | Short text | No | `list.footerCta.label` |
| Footer CTA href | `footerCtaHref` | Short text | No | `list.footerCta.href` → `/get-involved` |

**App fetch pattern:**

```ts
const [page] = await getEntries({ content_type: 'programsPage', limit: 1 })
const events = await getEntries({
  content_type: 'event',
  order: ['fields.sortOrder', 'fields.dateLabel'],
})
// EventList({ ...page, events: events.map(mapEvent) })
```

No Reference field on `programsPage`.

---

# 4. Event (detail + list card) — `event`

**API ID:** `event`  
**Entries:** one per event (start with 2: Summit + Classes)  
**Maps to:** list cards on `/programs` **and** full `/programs/:slug` page (`EventDetailHero`, `EventDetailBody`, `EventGallery`, optional `CtaBanner`)

Each event is **fully self-contained** (summary + detail + photos).

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Internal name | *(entry title)* | Short text | Yes | CMS only |
| Slug | `slug` | Short text | Yes | `event.slug` / route param — unique |
| Title | `title` | Short text | Yes | `event.title` |
| Cadence | `cadence` | Short text | Yes | `event.cadence` (`Annual`, `Quarterly`) |
| Status | `status` | Short text | Yes | Enum: `upcoming`, `ongoing`, `past` |
| Summary | `summary` | Long text | Yes | Card blurb + detail lead |
| Date label | `dateLabel` | Short text | Yes | Display date string |
| Time label | `timeLabel` | Short text | No | e.g. `Starting 8:00 AM` |
| Location | `location` | Short text | Yes | Venue / Online |
| Cover image | `coverImage` | **Media** | No | Asset → `coverImage.src/alt` |
| Body paragraphs | `body` | Long text *or* JSON Object | Yes | `event.body` |
| Highlights | `highlights` | **JSON Object** | No | `event.highlights` → `string[]` |
| Gallery photos | `photos` | **Media (many files)** | No | Map assets → `{ src, alt, caption? }[]` |
| Photos empty note | `photosEmptyNote` | Long text | No | Shown when `photos` empty |
| Register CTA label | `registerCtaLabel` | Short text | No | Detail-page form CTA |
| Register CTA href | `registerCtaHref` | Short text | No | Google Form URL |
| Sort order | `sortOrder` | Integer | No | List ordering (lower = first) |

**JSON shape for `highlights`:**

```json
[
  "First-ever Summit: August 1, 2026",
  "Starts at 8:00 AM",
  "Held at Grace Arena Ministries",
  "Open to young ministers countrywide",
  "Completely free to attend"
]
```

**Photos:** upload assets onto the **same** `event` entry (`photos` many files). In the adapter:

```ts
photos: (fields.photos ?? []).map((asset) => ({
  src: 'https:' + asset.fields.file.url,
  alt: asset.fields.title || event.title,
  caption: asset.fields.description || undefined,
}))
```

That is a Contentful **Asset** link (file), not an Entry reference — allowed and expected.

**Free-tier asset notes:** 50 MB max per file; assets count toward the 10,000 records budget; CDN bandwidth 50 GB/month.

---

# 5. Get Involved — `getInvolvedPage`

**API ID:** `getInvolvedPage`  
**Entries:** 1  
**Maps to:** `GetInvolvedPage` → `InvolvePathways`, `CtaBanner`

## Section A — Pathways (`InvolvePathways`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Pathways title | `title` | Short text | Yes | `pathways.title` |
| Pathways intro | `intro` | Long text | Yes | `pathways.intro` |
| Pathways | `pathways` | **JSON Object** | Yes | `pathways.pathways` |

**JSON shape for `pathways`:**

```json
[
  { "title": "Become a Member", "description": "Join the community…" },
  { "title": "Volunteer", "description": "Give your time and skills…" },
  { "title": "Attend an Event", "description": "Start with our first-ever Summit…" },
  { "title": "Spread the Word", "description": "Know a young minister…" },
  { "title": "Join a Mailing List", "description": "Stay in the loop… (Coming soon.)" },
  { "title": "Partner With Us", "description": "We welcome partnerships…" }
]
```

## Section B — Ready CTA (`CtaBanner`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| CTA title | `ctaTitle` | Short text | Yes | `readyCta.title` |
| Primary CTA label | `ctaPrimaryLabel` | Short text | Yes | → `/programs` |
| Primary CTA href | `ctaPrimaryHref` | Short text | Yes | |
| Secondary CTA label | `ctaSecondaryLabel` | Short text | No | → `/contact` |
| Secondary CTA href | `ctaSecondaryHref` | Short text | No | |
| CTA tone | `ctaTone` | Short text | No | `purple` / `cream` |

---

# 6. Contact — `contactPage`

**API ID:** `contactPage`  
**Entries:** 1  
**Maps to:** `ContactPage` → `ContactDetails`  
(Social **icons** stay in the React component; CMS supplies labels/URLs.)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| Title | `title` | Short text | Yes | `details.title` |
| Intro | `intro` | Short text | Yes | `details.intro` |
| Phone label | `phoneLabel` | Short text | Yes | `details.phoneLabel` |
| Phone | `phone` | Short text | Yes | `details.phone` |
| Location label | `locationLabel` | Short text | Yes | `details.locationLabel` |
| Location | `location` | Short text | Yes | `details.location` |
| Follow label | `followLabel` | Short text | Yes | `details.followLabel` |
| Socials | `socials` | **JSON Object** | Yes | `details.socials` |
| Press note | `pressNote` | Long text | Yes | `details.pressNote` |

**JSON shape for `socials`:**

```json
[
  {
    "label": "Instagram",
    "href": "https://instagram.com/youngministers_summit",
    "handle": "@youngministers_summit"
  },
  {
    "label": "Facebook",
    "href": "https://facebook.com/youngministerssummit",
    "handle": "Young Ministers Summit"
  },
  {
    "label": "TikTok",
    "href": "https://tiktok.com/@youngministers_summit",
    "handle": "@youngministers_summit"
  }
]
```

`label` must stay `Instagram` | `Facebook` | `TikTok` so the icon switcher in `SocialLinks` keeps working.

---

# 7. FAQ — `faqPage`

**API ID:** `faqPage`  
**Entries:** 1  
**Maps to:** `FaqPage` → `FaqAccordion`, `CtaBanner`

## Section A — FAQ list (`FaqAccordion`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| FAQ title | `title` | Short text | No | `faq.title` (default `"FAQ"`) |
| Items | `items` | **JSON Object** | Yes | `faq.items` |

**JSON shape for `items`:**

```json
[
  {
    "question": "What does the Young Ministers’ Summit do?",
    "answer": "We mentor, impart, and equip…"
  },
  {
    "question": "Do I need to pay to participate or join?",
    "answer": "No, it's completely free."
  }
]
```

## Section B — Bottom CTA (`CtaBanner`)

| Field name | Field ID | Type | Required | Maps to |
|------------|----------|------|----------|---------|
| CTA title | `ctaTitle` | Short text | Yes | `cta.title` |
| Primary CTA label | `ctaPrimaryLabel` | Short text | Yes | → `/programs` |
| Primary CTA href | `ctaPrimaryHref` | Short text | Yes | |
| Secondary CTA label | `ctaSecondaryLabel` | Short text | No | → `/contact` |
| Secondary CTA href | `ctaSecondaryHref` | Short text | No | |
| CTA tone | `ctaTone` | Short text | No | |

---

## Component → content type map (quick reference)

| React component | Page | Contentful home |
|-----------------|------|-----------------|
| `HeroSection` | Home | `homePage` hero* fields |
| `TextBlock` | Home / About | `homePage` about* / `aboutPage` why* |
| `ExploreLinks` | Home | `homePage.exploreItems` JSON |
| `TrackRecord` | Home | `homePage` trackRecord* |
| `Testimonials` | Home | `homePage` testimonial* |
| `CtaBanner` | Home, About, Get Involved, FAQ, Event detail | Inline CTA fields on that page/event |
| `MissionBlock` | About | `aboutPage` mission* |
| `BeliefsList` | About | `aboutPage.beliefsList` JSON |
| `DifferenceBlock` | About | `aboutPage` difference* |
| `LeadershipList` | About | `aboutPage.leaders` JSON |
| `EventList` | Programs | `programsPage` + query `event` |
| `EventDetailHero` | Event detail | `event` fields |
| `EventDetailBody` | Event detail | `event` summary/body/highlights |
| `EventGallery` | Event detail | `event.photos` assets |
| `InvolvePathways` | Get Involved | `getInvolvedPage.pathways` JSON |
| `ContactDetails` | Contact | `contactPage` |
| `FaqAccordion` | FAQ | `faqPage.items` JSON |

---

## Free-plan budget check

| Resource | This model | Free limit |
|----------|------------|------------|
| Content types | **7** | 25 |
| Page entries | **6** singletons | — |
| Event entries | **2+** (grows with events) | — |
| Assets | logo + event photos | part of 10k records |
| Entry references | **0** | Prefer avoid |
| Locales | 1 (English) | 2 |

You still have **18 content types** spare if you later add something like `announcement` — still avoid reference graphs.

---

## Editor workflow tips (Free plan)

1. Create the 7 content types first, then seed one entry per page + two events.
2. For JSON fields, paste valid JSON in Contentful’s JSON editor; validate in the app once.
3. Keep marketing Register hrefs as `/programs`; put the Google Form URL only on the Summit `event.registerCtaHref`.
4. Publish order: events → programs page → other pages (order doesn’t matter without references).
5. Cache CDA responses in the frontend or build step to stay under **100k API calls / month**.

---

## What not to model (on purpose)

- No `cta`, `quote`, `belief`, `leader`, `pathway`, `faqItem`, or `exploreItem` content types  
- No Reference fields from pages → events  
- No navbar / footer content types in this doc  
- No Rich Text required (Long text + JSON is enough and simpler to map)
