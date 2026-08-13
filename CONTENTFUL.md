# How to update the website in Contentful

The live site only shows **published** Contentful entries. Draft changes stay invisible until you click **Publish**.

Open the space: [app.contentful.com](https://app.contentful.com) → space **Young Ministers Movement** → environment **master**.

Site chrome that is **not** in Contentful (logo, nav, phone, social URLs, footer tagline) lives in `src/content/site.ts` and needs a code change.

---

## Golden rules

1. Find the entry → edit fields → **Publish**. If you only Save, the website will not change.
2. Most page sections are **one entry** of that type. Do not create a second `heroSection` or `homeTextBlock`.
3. List items (chapters, FAQs, training topics, Get Involved cards) are **one entry each**. Add a new entry of the same type, then Publish.
4. After publishing, wait a few seconds and refresh the site. Contentful’s CDN can lag briefly.
5. Keep internal handbook material **off** the public site (see [What not to publish](#what-not-to-publish)).

### How to upload an image

1. In the left sidebar, open **Media**.
2. **Add asset** → **Single file** → drop the photo.
3. Fill **Title** and **Description** (the description becomes alt text on the site).
4. **Publish** the asset.
5. Open the page entry, click the image field, **Link existing asset**, choose the photo, then **Publish** the entry.

---

## Home (`/`)

### 1. Hero (top of the page)

**Content type:** `heroSection`  
**Entry:** Young Ministers Movement

| Field | What it controls |
| --- | --- |
| Hero brand name | Large title |
| Hero Headline | Line under the title (Four Bs) |
| Hero body | Paragraph under the headline |
| Hero supporting line | Smaller line under the body |
| HeroCTA label | Button text |
| Hero CTA href | Button destination (`/get-involved`) |
| Hero image | Optional photo on the right. Leave empty to keep the logo-only hero (same as the presentation cover). |

**To change copy:** edit the text fields → Publish.  
**To add a hero photo:** upload in Media → set **Hero image** → Publish.

The circular logo in this section is **not** this field. It comes from `src/content/site.ts` (`logoSrc`).

### 2. What is YMM

**Content type:** `homeTextBlock`  
**Entry:** What is YMM

| Field | What it controls |
| --- | --- |
| About title | Heading |
| About paragraph | Body. Separate paragraphs with a blank line. |
| About quote | Italic quote under the body |
| Image | Portrait beside the copy (presentation “What is YMM” photo) |

**To replace the portrait:** Media → upload → set **Image** → Publish.

### 3. The Four Bs (teaser cards)

**Content type:** `journeyPillar`  
**Entries:** Belong, Become, Build, Beyond (four entries)

Home shows `name`, `question`, `statement`, and `summary`. The long `description` is used on `/journey`.

| Field | Home | Journey page |
| --- | --- | --- |
| name | Card title | Card title |
| number / sortOrder | Order (1–4) | Order |
| question | Question on the card | Question |
| statement | Short affirmation | Affirmation |
| summary | Card body | — |
| description | — | Full text |
| slug | belong / become / build / beyond | same |

**To edit a B:** open that pillar entry → change fields → Publish.  
**Do not** create a fifth pillar unless the framework itself changes.

Section title/intro for these cards come from `journeyPage` (`pillarsTitle`, `pillarsIntro`).

### 4. Explore the movement (three links)

**Content type:** `homeEploreLinks` (spelling is intentional — do not rename)

| Field | What it controls |
| --- | --- |
| exploreTitle | Section heading |
| exploreItems | JSON array of cards |

Each item needs `title`, `description`, `href`, and `linkLabel`. Example:

```json
[
  {
    "title": "The Journey",
    "description": "Walk the Four Bs: Belong, Become, Build, and Beyond.",
    "href": "/journey",
    "linkLabel": "Explore the journey"
  }
]
```

Keep JSON valid (commas between objects, double quotes). Publish after editing.

### 5. Present across five nations

This block appears on **Home and About**.

**Section chrome — content type:** `globalPresence`  
**Entry:** Present across five nations

| Field | What it controls |
| --- | --- |
| Title | Heading |
| Intro | Paragraph |
| Nations | Country names, one per line (UK, USA, Canada, Ghana, Kenya) |
| Images | Flag-map graphics from the presentation (UK / other nations) |

**Chapter cards — content type:** `chapter`  
**Entries:** United States, United Kingdom, Ghana, Canada, Kenya

| Field | What it controls |
| --- | --- |
| Country | Card label |
| Leader name | Name on the card |
| Leader title | Line under the name |
| Bio | Short paragraph |
| Photo | Leader portrait from the presentation |
| Sort order | 1 = US, 2 = UK, 3 = Ghana, 4 = Canada, 5 = Kenya |

**To add a new country:** Content → Add entry → Chapter → fill fields → upload **Photo** → set **Sort order** → Publish. Add the country name to **Nations** on `globalPresence` as well.

Kenya has no named leader or photo in the presentation. When you have one: open the Kenya chapter, set **Leader name**, **Bio**, and **Photo**, then Publish.

### 6. Track record

**Content type:** `homeTrackRecord`

| Field | What it controls |
| --- | --- |
| trackRecordTitle | Heading |
| trackRecordParagraph | Body (blank line = new paragraph) |
| trackRecordQuote | Quote |

Use this for impact/fruit copy, not the nations list.

### 7. In their words / Four Bs path

**Content type:** `homeTestimonials`

| Field | What it controls |
| --- | --- |
| title | Heading |
| quotes | JSON array of strings, or one quote per line |
| story | Closing paragraph |

Example quotes:

```json
[
  "I have a place here.",
  "I am growing here.",
  "I am being equipped here.",
  "I can now reproduce what I have received."
]
```

### 8. Bottom CTA

**Content type:** `homeCtaBanner`

| Field | What it controls |
| --- | --- |
| title | Banner heading |
| description | Banner body |
| ctaLabel | Button text |
| ctaHref | Button destination (`/get-involved`) |

---

## About (`/about`)

### 1. Why we exist

**Content type:** `aboutTextblock`

| Field | What it controls |
| --- | --- |
| title | Heading |
| description | Rich text body |

Edit in the rich-text editor. Use paragraphs, not one giant block. Publish.

### 2. Vision and mission

**Content type:** `aboutMission`

| Field | What it controls |
| --- | --- |
| visionTitle | “Vision” |
| visionBody | Vision sentence |
| title | “Mission” |
| description | Mission paragraph |

### 3. What we stand on (core values)

**Content type:** `aboutBelief`

| Field | What it controls |
| --- | --- |
| title | Heading |
| beliefsIntro | Short intro line |
| beliefsList | Rich text: a heading then a paragraph for each value (Honor, Love, Prayer, Excellence, Innovation) |

### 4. How the movement functions

**Content type:** `aboutDifferenceBlock`

| Field | What it controls |
| --- | --- |
| title | Heading |
| description | Rich text body |
| quotes | One quote per line, or JSON |

### 5. Nations and chapter leaders

Same entries as Home section 5 (`globalPresence` + `chapter`). Edit once; both pages update.

### 6. Leadership (movement-level, not chapter leaders)

**Content type:** `aboutLeadership`

| Field | What it controls |
| --- | --- |
| leadershipTitle | Heading |
| title | JSON list of leaders (legacy). Used if `leaders` is empty. |
| leaders | Optional linked `leader` entries |

Chapter leaders belong in `chapter`, not here.

**Preferred (new leaders):** Content type `leader` — fields `name`, `role`, `affiliation`, `bio`, `photo`, `sortOrder`. Create entries, then link them on `aboutLeadership` → **leaders** → Publish both the person and the leadership entry.

### 7. Bottom CTA

**Content type:** `aboutCtaBanner`  
Fields: `title`, `description`, `ctaLabel`, `ctaHref` (same pattern as the home CTA).

---

## Journey (`/journey`)

### 1. Page intro and section titles

**Content type:** `journeyPage`  
**Entry:** The Journey

| Field | What it controls |
| --- | --- |
| title | Page heading |
| intro | Opening paragraphs (blank line = new paragraph) |
| pillarsTitle / pillarsIntro | Four Bs section |
| communityTitle / communityIntro | Three groups section |
| trainingTitle / trainingIntro | Curriculum section |
| beyondTitle / beyondBody | Beyond section (rich text) |
| commissioningTitle / commissioningBody | Commissioning section (rich text) |
| ctaTitle / ctaBody / ctaLabel / ctaHref | Bottom banner |

### 2. Four Bs (full text)

Same four `journeyPillar` entries as Home. Edit `description` here for the long copy; `summary` is the Home card.

### 3. Three levels of community

**Content type:** `communityGroup`  
**Entries:** The main movement group, The specific ministry group, The mixed group

| Field | What it controls |
| --- | --- |
| title | Card title |
| description | Card body |
| sortOrder | 1, 2, 3 |

**To add a group:** Add entry → Community Group → Publish.

### 4. Training programme

**Content type:** `trainingTopic`  
**Entries:** 17 fundamental topics + specialised (Worship, Media)

| Field | What it controls |
| --- | --- |
| title | Topic name |
| summary | Short intro |
| points | Rich text bullets |
| category | `fundamental` or `specialised` (exact spelling) |
| sortOrder | Display order |

**To add a topic:** Add entry → Training Topic → set category and sort order → Publish.

---

## Programs (`/programs` and `/programs/:slug`)

### 1. List page chrome

**Content type:** `programsPage`

| Field | What it controls |
| --- | --- |
| title | Page heading |
| intro | Intro paragraph |
| footerNote | Optional note under the list |
| footerCtaLabel / footerCtaHref | Optional footer button |

### 2. Each event / gathering

**Content type:** `programs`  
**Current entry:** Young Ministers' Summit

| Field | What it controls |
| --- | --- |
| title | Event name (list + detail) |
| tag | Cadence label (e.g. Annual) |
| date | Used for ordering and the date label |
| summary | Short text on the list card |
| location | Venue |
| status | Upcoming / Ongoing / Past |
| eventDetailTitle | Heading on the detail page |
| description | Long body (rich text) |
| eventDetails | Highlights list (rich text bullets) |
| media | Photos for the gallery / cover |

**To add an event:** Add entry → Programs → fill fields → upload photos into **media** → Publish. The site builds the URL from the title (slug).

**To change Summit photos:** open the Summit entry → **media** → add/remove assets → Publish the entry **and** each new asset.

---

## Get Involved (`/get-involved`)

### 1. Page intro and bottom CTA

**Content type:** `getInvolvedPage`

| Field | What it controls |
| --- | --- |
| title | Heading |
| intro | Intro paragraph |
| ctaTitle / ctaBody / ctaLabel / ctaHref | Bottom banner |

### 2. Why-join cards

**Content type:** `getInvolved`  
One entry per card (Mentorship, Global ministry training, Ordination & licensing, National & global ministry platforms, A global network, Financial support & ministry development, plus Partner With Us).

| Field | What it controls |
| --- | --- |
| title | Card title |
| description | Card body |

**To add a card:** Add entry → Get Involved → Publish. Cards appear in creation order.

**To remove a card:** Archive or unpublish that entry (do not leave a published empty card).

---

## Contact (`/contact`)

**Content type:** `contact`

| Field | What it controls |
| --- | --- |
| title | Heading |
| description | Intro (rich text) |
| phoneLabel / phone | Optional. If empty, the site uses `src/content/site.ts`. |
| locationLabel / location | Optional. Same fallback. |
| pressNote | Optional note at the bottom |

Social links are **not** in this entry. Edit `src/content/site.ts`.

---

## FAQ (`/faq`)

### 1. Page heading and CTA

**Content type:** `faqPage`

| Field | What it controls |
| --- | --- |
| title | Page heading |
| ctaTitle / ctaBody / ctaLabel / ctaHref | Bottom banner |

### 2. Each question

**Content type:** `faq`  
One entry per question.

| Field | What it controls |
| --- | --- |
| title | The question |
| description | The answer |

**To add a question:** Add entry → FAQ → Publish.  
**To edit:** open that FAQ entry → change title/description → Publish.  
**To hide:** Unpublish or archive the entry.

---

## Presentation images — where they live

These fields already exist in Contentful and are filled from `YMM_Presentation.pdf`.

| Presentation slide | Contentful field | Status |
| --- | --- | --- |
| Cover logo | Site logo (`src/content/site.ts` → `/logo1.png`), not a CMS field | In the header/hero |
| What is YMM portrait | `homeTextBlock` → **Image** | Published |
| Optional extra hero photo | `heroSection` → **Hero image** | Field exists; leave empty unless you want a second photo beside the logo |
| Five-nations flag maps | `globalPresence` → **Images** | Published (3 graphics) |
| US — Pastor Richmond Owusu | `chapter` United States → **Photo** | Published |
| UK — Pastor Keith Addae | `chapter` United Kingdom → **Photo** | Published |
| Ghana — Pastor Ransford Papaa Amoako | `chapter` Ghana → **Photo** | Published |
| Canada — Prophet Elisha Mugabo | `chapter` Canada → **Photo** | Published |
| Kenya | `chapter` Kenya → **Photo** | Empty until a portrait is supplied |
| Tiny decorative icons on vision/mission slides | — | Not used (too small for the site) |

**To replace a photo:** upload a new asset in Media → Publish it → open the entry → swap the image field → Publish the entry.

---

## Quick map: website section → Contentful type

| Page | On-page section | Content type |
| --- | --- | --- |
| Home | Hero | `heroSection` |
| Home | What is YMM | `homeTextBlock` |
| Home / Journey | Four Bs | `journeyPillar` (×4) |
| Home | Explore links | `homeEploreLinks` |
| Home / About | Nations + chapters | `globalPresence` + `chapter` |
| Home | Track record | `homeTrackRecord` |
| Home | Quotes / path | `homeTestimonials` |
| Home | Bottom CTA | `homeCtaBanner` |
| About | Why we exist | `aboutTextblock` |
| About | Vision & mission | `aboutMission` |
| About | Core values | `aboutBelief` |
| About | How we function | `aboutDifferenceBlock` |
| About | Leadership | `aboutLeadership` (+ `leader`) |
| About | Bottom CTA | `aboutCtaBanner` |
| Journey | Intro, Beyond, commissioning, CTA | `journeyPage` |
| Journey | Community groups | `communityGroup` |
| Journey | Training topics | `trainingTopic` |
| Programs | List chrome | `programsPage` |
| Programs | Each event | `programs` |
| Get Involved | Intro + CTA | `getInvolvedPage` |
| Get Involved | Cards | `getInvolved` |
| Contact | Page | `contact` |
| FAQ | Heading + CTA | `faqPage` |
| FAQ | Questions | `faq` |

---

## What not to publish

Keep these in internal handbooks, not on the website:

- Birthday posters, cakes, and contribution customs
- Immediate-family financial policy for weddings, sickness, and burials
- Rules about business deals between members
- No-borrowing / no-solicitation in official groups
- Romantic-relationship reporting to leaders
- Collecting members’ phone numbers and dates of birth
- Named mixed-group leader rosters (Love, Joy, Peace, …)

The public site should describe **belonging, growth, training, and sending** — not internal pastoral procedure.
