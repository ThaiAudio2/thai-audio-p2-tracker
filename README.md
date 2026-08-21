# Thai Audio — P2 · Project Milestone & Tracker

เว็บ tracker แบบโต้ตอบได้สำหรับโปรเจกต์ **Thai Audio Phase 2** — เป้าหมาย **500 QC-Passed Pairs**
แบ่งเป็น 11 milestones ตั้งแต่ Acquisition → Pilot → Stable Weekly Delivery → Scale → QC & Closure

An interactive milestone tracker for the **Thai Audio Phase 2** project — a **500 QC-passed pairs**
delivery target across 11 milestones. Built as a plain static site (HTML + CSS + vanilla JS), so it
deploys anywhere with no build step and runs entirely in the browser.

> **Where progress is saved:** by default each task's status, notes, and painted days are saved
> in your browser via `localStorage` (private to that device). **Connect Firebase** (below) to sync
> the whole board **live across everyone**. You can also **Export/Import** the state as JSON.

---

## ✨ Features

- **Spreadsheet-style Gantt board** — a continuous daily date axis (like the source sheet), 7 weeks
  from Mon 17 Aug → Sun 04 Oct 2026, with the current day highlighted and weekends shaded.
- **Schedule bars you can paint** — every task has a colored bar for its scheduled days; **click any
  day cell to paint / unpaint it**, just like marking cells in the spreadsheet.
- **Goal dashboard** — overall completion ring, KPI cards, and a status-distribution bar.
- **11 milestones** transcribed from the source spreadsheet, each with its tasks, owners
  (POC / Management / Ops / TA), checklists, and remarks (click a task title to expand).
- **Per-task status** — pick from the project's status codes (`IP`, `PI`, `WQ`, `ES`, `TC`, `DL`, …);
  the bar takes the status color.
- **Per-task notes**, **search & filter** (text / status / owner), **Export / Import / Reset**.
- **Live multi-person sync** via Firebase Firestore (optional — see below).
- **Light / dark theme**, **zero build** — just static files.

---

## 👥 Sync across people (Firebase — optional)

Out of the box the board saves locally. To make everyone see the same board in real time:

1. Go to **https://console.firebase.google.com** → **Add project** (any name).
2. In the project, open **Build → Firestore Database → Create database** → **Start in production mode**.
3. Add a **Web app**: Project Overview → the `</>` icon → register the app → copy the
   **`firebaseConfig`** object it shows you.
4. Paste those values into the config block near the bottom of **`index.html`** (or of the single
   `thai-audio-p2-tracker.html` file), e.g.:

   ```html
   <script>
     window.TRACKER_BOARD_ID = "thai-audio-p2";
     window.FIREBASE_CONFIG = {
       apiKey: "AIza…",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "1234567890",
       appId: "1:1234567890:web:abc123"
     };
   </script>
   ```

5. Set **Firestore → Rules** so the board doc is shared (open read/write for simplicity — anyone
   with the link can edit; tighten later with Firebase Auth if needed):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /trackers/{board} {
         allow read, write: if true;
       }
     }
   }
   ```

6. Redeploy (drag the file onto Netlify Drop again, or push if you connected Git).
   The badge in the header turns **● Live · synced** and every change is shared instantly.

> The Firebase **web config is not a secret** (it's shipped to every browser); access is governed by
> the Firestore **Security Rules** above, not by hiding the config. All state lives in one document:
> `trackers/thai-audio-p2`.

---

## 🚀 Deploy on Netlify (step by step)

This repo is already Netlify-ready (`netlify.toml` sets everything up). Two ways to publish:

### Option A — Connect the Git repo (recommended, auto-deploys on every push)

1. Sign in at **https://app.netlify.com**.
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** (authorize Netlify if asked) and pick this repository.
4. Select the branch you want to deploy (e.g. `claude/new-repo-netlify-fsdmwa` or `main`).
5. Netlify reads `netlify.toml`, so the fields fill in automatically:
   - **Build command:** _(leave blank)_
   - **Publish directory:** `.`
6. Click **Deploy site**. In ~30 seconds you'll get a live URL like
   `https://your-site-name.netlify.app`.
7. (Optional) **Site settings → Change site name** to pick a nicer subdomain, or
   **Domain management** to attach your own domain.

Every push to the connected branch now redeploys automatically.

### Option B — Drag & drop (fastest, no Git connection)

1. Go to **https://app.netlify.com/drop**.
2. Drag this project folder (the one containing `index.html`) onto the page.
3. Done — you get an instant live URL. (Re-drag to update; no auto-deploy.)

### Option D — GitHub Pages (free, auto-deploy on push)

This repo includes `.github/workflows/pages.yml`, which publishes the site to
GitHub Pages on every push.

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source =
   “GitHub Actions”** (one-time).
2. Push to the deploy branch (the workflow also runs from `main`). The Action
   builds and deploys automatically.
3. Live URL: **https://ppakawat1997-dev.github.io/HOBI_Seminar/**

All asset paths are relative, so it works under the `/HOBI_Seminar/` sub-path,
and Firebase sync works the same from the github.io domain.

### Option C — Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy          # draft preview
netlify deploy --prod   # publish to production
```

---

## 🖥️ Run locally

No dependencies to install. Serve the folder with any static server:

```bash
# Python
python3 -m http.server 8080
# then open http://localhost:8080

# or Node
npx serve .
```

> Open via a local server (not `file://`) — the app loads ES modules, which browsers
> block on the `file://` protocol.

---

## ✏️ Editing the plan

All content lives in **`assets/data.js`**:

- `PROJECT` — title, "updated on" date, goal.
- `STATUSES` — the status codes and their colors.
- `GRID` — the day axis (start date, number of weeks, "today").
- `WEEKS` — the week labels shown across the top of the Gantt.
- `SCHEDULE` — each task's default bar: `{ start, end }`, `{ start, end, weekdays }`, or
  `{ conditional: true }`. Dates are ISO (`2026-08-24`); `weekdays` are `0`=Sun … `6`=Sat.
- `MILESTONES` — the milestones and their tasks (title, `owners`, `lines`, `detail`, `remarks`).

Each task needs a **stable `id`**. The tracker keys saved progress on that `id`, so renaming an
existing `id` detaches its saved status/notes/painted days — add new ids freely, but don't renumber
old ones.

> After editing `assets/*`, rebuild the single drag-and-drop file with:
> `node scripts/build-standalone.mjs`

## 📁 Structure

```
index.html          # app shell + Firebase config slot
assets/
  data.js           # the plan (milestones, tasks, schedule, statuses) — edit here
  app.js            # Gantt rendering, interactivity, localStorage + Firebase sync
  styles.css        # theme-aware styling
  favicon.svg
scripts/
  build-standalone.mjs   # bundles everything into thai-audio-p2-tracker.html
thai-audio-p2-tracker.html  # single self-contained file for Netlify Drop
netlify.toml        # Netlify deploy config (no build step)
```
