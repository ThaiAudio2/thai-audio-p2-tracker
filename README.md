# HOBI Partner Seminar 2026

A premium, responsive **public website** for the HOBI Partner Seminar 2026, backed by **Firebase Firestore** as a shared, real-time source of truth. When seminar content changes in Firestore, everyone currently viewing the site sees the update — no redeploy required.

> **Scope:** this is a public, read-only marketing/information site. There is **no admin dashboard** — seminar content is managed directly in Firebase (console or the seed script). The code is organized so an admin dashboard could be added later without rewriting the app.

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + React Router + [lucide-react](https://lucide.dev) icons
- **Backend:** Firebase Firestore (real-time listeners) + Cloud Storage for media
- **Design:** white / off-white, charcoal / black, a single restrained cobalt accent, strong typography, generous whitespace, subtle motion. No emoji-as-icons, no gradient/glass excess.

---

## Table of contents

1. [Features](#features)
2. [Project structure](#project-structure)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Local development](#local-development)
6. [Environment variables](#environment-variables)
7. [Firebase setup](#firebase-setup)
8. [Firestore collections](#firestore-collections)
9. [Editing seminar content in Firebase](#editing-seminar-content-in-firebase)
10. [Seeding initial data](#seeding-initial-data)
11. [Security Rules](#security-rules)
12. [Testing & QA](#testing--qa)
13. [Production deployment](#production-deployment)

---

## Features

- **Sections:** Navigation, Hero, Seminar Introduction (overview + objectives), Highlights, Agenda / Timeline, Speakers, Important Information, Announcements, Resources, FAQ, Footer.
- **Real-time data:** agenda, speakers, announcements, FAQ, and resources stream from Firestore via `onSnapshot`. Edit a document and open browsers update live.
- **Graceful fallback:** if Firebase is unconfigured or a collection is empty, the site renders bundled **seed data** so it never looks broken during development.
- **States everywhere:** loading skeletons, empty states, and error handling on every data-driven section (plus a config banner when env vars are missing).
- **Responsive:** verified with no horizontal overflow at **375 / 390 / 768 / 1024 / 1440 px**; the agenda is optimized for mobile.
- **Motion:** hero reveal, on-scroll section reveals, button/card hover — subtle and controlled, and disabled under `prefers-reduced-motion`.

---

## Project structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Logo, ConfigBanner
│   ├── sections/      # Hero, Introduction, EventInfo, Highlights, Agenda,
│   │                  #   Speakers, ImportantInfo, Announcements, Resources, Faq
│   └── ui/            # Button, Field, Modal, Badge, Section, Reveal, Icon, states
├── services/          # Firebase access, one service per entity (see below)
│   ├── shared.ts      #   subscribeCollection() + helpers
│   ├── eventService.ts
│   ├── agendaService.ts
│   ├── speakerService.ts
│   ├── announcementService.ts
│   ├── faqService.ts
│   └── resourceService.ts
├── hooks/             # useRealtime (live + fallback), publicData (per-entity hooks)
├── context/           # EventContext (real-time event settings)
├── lib/               # firebase (init), paths (schema), types, format, cn
├── data/seed.ts       # Single source of truth for seed / fallback content
└── pages/             # HomePage, NotFound

scripts/seed.ts        # Admin-SDK seeder → migrates src/data/seed.ts into Firestore
firestore.rules        # Read-only public Security Rules
storage.rules          # Cloud Storage rules
firebase.json          # Hosting + rules + emulator config
.env.example           # Copy to .env
```

**Firebase logic is kept out of UI components.** Components use hooks (`useAgenda`, `useSpeakers`, …) which bind to **services** (`agendaService`, `speakerService`, …). Services are the only place that touches Firestore, so adding an admin/write layer later means adding methods to a service — not rewiring the UI.

---

## Architecture

```
 UI sections ──▶ hooks (useAgenda, useSpeakers, useEvent, …)
                    │  real-time + graceful fallback
                    ▼
                 services (agendaService.subscribe, …)
                    │  onSnapshot()
                    ▼
              Cloud Firestore  ◀── managed via console / Admin SDK seed
                    │
              Firebase Security Rules (public read of published content)
```

Data flow for every collection:

1. **Not configured** → render `src/data/seed.ts` immediately (`source: "fallback"`).
2. **Firestore has rows** → render live data (`source: "live"`), updating in real time.
3. **Firestore empty / slow / errored** → fall back to seed data so the section is never blank.

---

## Installation

```bash
npm install
```

Requirements: **Node.js 20.6+** (Node 22 recommended). The site runs with **no configuration** out of the box, rendering seed data.

---

## Local development

```bash
npm run dev         # Vite dev server (HMR) on http://localhost:5173
npm run build       # typecheck + production build → dist/
npm run preview     # serve the production build on :4173
npm run lint        # ESLint (zero warnings enforced)
npm run typecheck   # tsc (app + scripts)
npm run test:e2e    # Playwright end-to-end tests
```

### Optional: Firebase Emulator Suite

```bash
npm run emulators   # Firestore :8080, Storage :9199, UI
```

Then set `VITE_USE_EMULATORS=true` in `.env` and run `npm run dev` to point the app at local emulators.

---

## Environment variables

Copy `.env.example` → `.env` and fill in your Firebase **web app** config.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | ✅ | Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Project id |
| `VITE_FIREBASE_STORAGE_BUCKET` | ✅ | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Sender id |
| `VITE_FIREBASE_APP_ID` | ✅ | Web app id |
| `VITE_EVENT_ID` | – | Active event doc id (default `hobi-partner-seminar-2026`) |
| `VITE_USE_EMULATORS` | – | `true` to use local emulators |
| `GOOGLE_APPLICATION_CREDENTIALS` | – | Service-account key path — **seed script only** |

> `VITE_FIREBASE_*` values ship in the client bundle — that's expected and safe. Firebase web config is **not** secret; read access is governed by Security Rules. **Never commit** a real `.env` or a service-account key (both are gitignored).

---

## Firebase setup

1. Create a project at <https://console.firebase.google.com>.
2. **Add a Web app** (Project settings → General → *Your apps* → Web) and copy the config into `.env`.
3. **Create a Firestore database** (Production mode).
4. (Optional) **Enable Cloud Storage** if you'll host speaker photos / resource files there.
5. **Deploy Security Rules** before going live:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add          # pick your project → alias "default"
   firebase deploy --only firestore:rules,storage
   ```

---

## Firestore collections

A single active event document with subcollections. Every document carries `createdAt` and `updatedAt` server timestamps.

```
events/{eventId}                       # eventId = VITE_EVENT_ID
  ├─ name, tagline, heroHeadline, heroSubcopy
  ├─ status: "draft" | "published"     # only "published" is publicly readable
  ├─ startDate, endDate, timezone
  ├─ venueName, venueAddress, city, country
  ├─ contactEmail, registrationTime, dressCode, parking
  ├─ introTitle, introBody, objectives[]
  ├─ highlights[]      # { id, icon, label, value, description }
  └─ importantInfo[]   # { id, icon, title, body }

events/{eventId}/agenda/{agendaId}
  └─ day, startTime, endTime, title, description, track,
     location, speaker, status, order, published

events/{eventId}/speakers/{speakerId}
  └─ name, title, company, bio, photoUrl, linkedin, session,
     order, featured, published

events/{eventId}/announcements/{announcementId}
  └─ title, body, level: info|success|warning|critical,
     pinned, published, publishAt

events/{eventId}/faqs/{faqId}
  └─ question, answer, category, order, published

events/{eventId}/resources/{resourceId}
  └─ title, description, type: pdf|link|slide|video|file, url, order, published
```

Only a single equality filter (`published == true`) is used, so **no composite indexes are required** (`firestore.indexes.json` is intentionally empty). Ordering is done client-side. `icon` fields use [Lucide](https://lucide.dev) names (e.g. `CalendarDays`, `MapPin`).

---

## Editing seminar content in Firebase

Because there's no admin UI, content is edited directly in Firestore:

- **Firebase console** → Firestore → navigate to `events/{eventId}` and its subcollections. Add, edit, or delete documents there. Set `published: true` to make an item public. Changes appear on the live site **immediately** thanks to real-time listeners.
- To publish the event itself, set the event document's `status` to `"published"`.
- To hide an item without deleting it, set `published: false`.

Field reference is the [Firestore collections](#firestore-collections) schema above.

---

## Seeding initial data

`src/data/seed.ts` is the single source of truth for initial content (and the site's fallback). `scripts/seed.ts` migrates it into Firestore using the **Firebase Admin SDK** (server-side, bypasses Security Rules — no user auth needed).

```bash
# 1. Download a service-account key:
#    Firebase console → Project settings → Service accounts → Generate new private key
# 2. Point to it (or set GOOGLE_APPLICATION_CREDENTIALS in .env) and run:
export GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
export VITE_FIREBASE_PROJECT_ID=your-project     # if not already in .env
npm run seed
```

The seeder writes with `merge` and fixed document ids, so it's safe to re-run. To change initial content, edit `src/data/seed.ts` and re-seed.

---

## Security Rules

Full rules: [`firestore.rules`](./firestore.rules), [`storage.rules`](./storage.rules). Highlights:

- **Public reads** are limited to **published** content: the event when `status == "published"`, and agenda/speakers/announcements/FAQ/resources when `published == true`.
- **All client writes are denied.** Content is managed via the console or Admin SDK (both bypass rules). There are **no globally-open rules** (`if true`); unmatched paths are denied by default.
- **Storage:** event media under `events/**` is publicly readable; client writes are denied.

If you later add an authenticated admin dashboard, scope writes to an admin role in the rules (a custom claim or a `users/{uid}.role` check) — never open them up globally.

Deploy after any change:

```bash
firebase deploy --only firestore:rules,storage
```

---

## Testing & QA

End-to-end tests use **Playwright** (Chromium) against a production preview build:

```bash
npm run test:e2e
```

Coverage: homepage rendering, navigation, the agenda (desktop + mobile), data sections rendering via the fallback path, responsive layout with **no horizontal overflow** at 375 / 390 / 768 / 1024 / 1440 px, and a console-error guard.

The full quality gate — `npm run lint`, `npm run typecheck`, and `npm run build` — all pass.

---

## Production deployment

Deploys as a static SPA. `firebase.json` includes the SPA rewrite and cache headers for **Firebase Hosting**:

```bash
npm run build
firebase deploy --only hosting,firestore:rules,storage
# or deploy everything:
firebase deploy
```

Any static host works too (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront): build with `npm run build`, serve `dist/` with an SPA fallback to `index.html`, and set the `VITE_*` variables in the host's environment.

---

## License

Proprietary — © HOBI Partner Seminar. All rights reserved.
