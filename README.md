# Thai Audio — P2 · Project Milestone & Tracker

เว็บ tracker แบบโต้ตอบได้สำหรับโปรเจกต์ **Thai Audio Phase 2** — เป้าหมาย **500 QC-Passed Pairs**
แบ่งเป็น 11 milestones ตั้งแต่ Acquisition → Pilot → Stable Weekly Delivery → Scale → QC & Closure

An interactive milestone tracker for the **Thai Audio Phase 2** project — a **500 QC-passed pairs**
delivery target across 11 milestones. Built as a plain static site (HTML + CSS + vanilla JS), so it
deploys anywhere with no build step and runs entirely in the browser.

> **Live data note:** progress (each task's status + notes) is saved in your browser via
> `localStorage`. It's private to that browser/device. Use **Export** to back it up or hand the
> JSON to a teammate, and **Import** to load it back.

---

## ✨ Features

- **Goal dashboard** — overall completion ring, KPI cards, and a status-distribution bar.
- **11 milestones** transcribed from the source spreadsheet, each with its tasks, owners
  (POC / Management / Ops / TA), checklists, and remarks.
- **Per-task status** — pick from the project's status codes (`IP`, `PI`, `WQ`, `ES`, `TC`, `DL`, …).
- **Per-task notes** — jot a quick update on any task.
- **Near-term weekly timeline** (WK 0 → W6, Aug 17 → Oct 04 2026) with the current week highlighted.
- **Search & filter** by text, status, or owner.
- **Export / Import / Reset** progress as JSON.
- **Light / dark theme** with a one-click toggle.
- **Zero backend, zero build** — just static files.

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

- `PROJECT` — title, "updated on" date, goal, current week.
- `STATUSES` — the status codes and their colors.
- `WEEKS` — the near-term timeline strip.
- `MILESTONES` — the milestones and their tasks (title, `owners`, `lines`, `detail`, `remarks`).

Each task needs a **stable `id`**. The tracker keys saved progress on that `id`, so renaming an
existing `id` detaches its saved status/notes — add new ids freely, but don't renumber old ones.

## 📁 Structure

```
index.html          # app shell
assets/
  data.js           # the plan (milestones, tasks, statuses, weeks) — edit here
  app.js            # rendering + interactivity + localStorage
  styles.css        # theme-aware styling
  favicon.svg
netlify.toml        # Netlify deploy config (no build step)
```
