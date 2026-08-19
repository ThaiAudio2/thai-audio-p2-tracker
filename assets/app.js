/* ------------------------------------------------------------------ *
 * Thai Audio — P2 Project Milestone & Tracker
 *
 * Spreadsheet-style Gantt board with a continuous date axis (like the
 * source sheet). Each task has a schedule bar you can repaint by clicking
 * day cells; status + notes + painted days are the shared state.
 *
 * Sync: if a Firebase web config is provided (window.FIREBASE_CONFIG),
 * the whole board syncs live across everyone through one Firestore doc.
 * With no config it falls back to this browser's localStorage.
 * ------------------------------------------------------------------ */
import { PROJECT, STATUSES, WEEKS, MILESTONES, GRID, SCHEDULE, DESCRIPTIONS } from './data.js';

const BOARD_ID = window.TRACKER_BOARD_ID || 'thai-audio-p2';
const FIREBASE_CONFIG = window.FIREBASE_CONFIG || {};
const STORE_KEY = 'thaiaudio-p2-tracker.v2';

const byKey = Object.fromEntries(STATUSES.map((s) => [s.key, s]));
const ALL_TASKS = MILESTONES.flatMap((m) => m.tasks.map((t) => ({ ...t, ms: m })));
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/* ---------------- day grid ---------------- */
function buildDays() {
  const out = [];
  const start = new Date(GRID.start + 'T00:00:00');
  for (let i = 0; i < GRID.weeks * 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const dow = d.getDay();
    out.push({
      iso, dow, dayNum: d.getDate(), month: d.getMonth(),
      weekIndex: Math.floor(i / 7),
      isWeekend: dow === 0 || dow === 6,
      isToday: iso === GRID.today,
      isMonthStart: d.getDate() === 1 || i === 0,
    });
  }
  return out;
}
const DAYS = buildDays();
const GRID_END = DAYS[DAYS.length - 1].iso;
const WEEK_GROUPS = WEEKS.map((w, i) => {
  const days = DAYS.filter((d) => d.weekIndex === i);
  return { ...w, days };
});

/* ---------------- state + persistence ---------------- */
const loadLocal = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
};
let state = loadLocal();
const saveLocal = () => localStorage.setItem(STORE_KEY, JSON.stringify(state));

const statusOf = (id) => state[id]?.status || 'NS';
const noteOf = (id) => state[id]?.note || '';
const dayOverride = (id, iso) => state[id]?.days?.[iso];

function setStatus(id, val) {
  state[id] = { ...(state[id] || {}), status: val };
  saveLocal(); pushRemote(`tasks.${id}.status`, val);
}
function setNote(id, val) {
  state[id] = { ...(state[id] || {}), note: val };
  saveLocal(); pushRemote(`tasks.${id}.note`, val);
}
function setDay(id, iso, on) {
  const days = { ...(state[id]?.days || {}) };
  days[iso] = on ? 1 : 0;
  state[id] = { ...(state[id] || {}), days };
  saveLocal(); pushRemote(`tasks.${id}.days.${iso}`, on ? 1 : 0);
}

/* ---------------- schedule / painting ---------------- */
function schedKind(id) {
  const s = SCHEDULE[id];
  if (!s) return 'none';
  if (s.conditional) return 'conditional';
  if (s.start && s.start > GRID_END) return 'future';
  return 'grid';
}
function defaultActive(id, day) {
  const s = SCHEDULE[id];
  if (!s || s.conditional) return false;
  if (s.start && day.iso < s.start) return false;
  if (s.end && day.iso > s.end) return false;
  if (s.weekdays && !s.weekdays.includes(day.dow)) return false;
  return true;
}
function isPainted(id, day) {
  const o = dayOverride(id, day.iso);
  if (o !== undefined) return !!o;
  return defaultActive(id, day);
}

/* ---------------- helpers ---------------- */
const $ = (sel, el = document) => el.querySelector(sel);
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const owis = (t) => {
  const o = t.owners || {}; const out = [];
  if (o.poc1) out.push(['POC1', o.poc1]); if (o.poc2) out.push(['POC2', o.poc2]);
  if (o.mgmt) out.push(['Mgmt', o.mgmt]); if (o.ops) out.push(['Ops', o.ops]); if (o.ta) out.push(['TA', o.ta]);
  return out;
};
const ownerNames = (t) => owis(t).map(([, v]) => v);

let toastTimer;
const toast = (msg) => {
  let t = $('.toast'); if (!t) { t = el('div', 'toast'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
};

/* ---------------- metrics ---------------- */
function metrics() {
  const total = ALL_TASKS.length;
  let done = 0, active = 0;
  const dist = Object.fromEntries(STATUSES.map((s) => [s.key, 0]));
  for (const t of ALL_TASKS) {
    const k = statusOf(t.id); dist[k]++;
    if (byKey[k]?.done) done++;
    else if (k !== 'NS' && !byKey[k]?.stopped) active++;
  }
  return { total, done, active, pct: total ? Math.round((done / total) * 100) : 0, dist };
}

/* ---------------- header / hero ---------------- */
function renderHeader() {
  $('#brand-title').textContent = PROJECT.title;
  $('#brand-sub').textContent = PROJECT.subtitle;
  $('#updated').innerHTML = `Updated <b>${esc(PROJECT.updatedOn)}</b>`;
  $('#goal-num').textContent = PROJECT.goal.split(' ')[0];
  $('#goal-lbl').textContent = PROJECT.goal.replace(/^\S+\s/, '');
}
function renderHero() {
  const m = metrics();
  $('#ring').style.setProperty('--p', m.pct);
  $('#ring span').textContent = m.pct + '%';
  const kpis = [
    { n: m.done, l: 'Tasks completed', sub: `of ${m.total} total` },
    { n: m.active, l: 'In flight', sub: 'started, not done' },
    { n: MILESTONES.length - 1, l: 'Milestones', sub: '+ setup phase' },
    { n: `${GRID.weeks}w`, l: 'On the grid', sub: 'Aug 17 – Oct 04' },
  ];
  $('#kpis').innerHTML = kpis.map((k) => `<div class="kpi"><div class="n">${k.n}</div><div class="l">${k.l}</div><div class="sub">${k.sub}</div></div>`).join('');
  const shown = STATUSES.filter((s) => m.dist[s.key] > 0);
  $('#dist').innerHTML =
    `<div class="section-title">Status distribution</div>
     <div class="dist-bar">${shown.map((s) => `<span style="width:${(m.dist[s.key] / m.total) * 100}%;background:${s.color}" title="${s.label}: ${m.dist[s.key]}"></span>`).join('')}</div>
     <div class="dist-key">${shown.map((s) => `<span class="k"><span class="sw" style="background:${s.color}"></span>${s.label} · ${m.dist[s.key]}</span>`).join('')}</div>`;
}
function renderLegend() {
  $('#legend').innerHTML = STATUSES.filter((s) => s.key !== 'NS').map((s) => `<span class="chip"><span class="sw" style="background:${s.color}"></span>${s.key} · ${s.label}</span>`).join('');
}
function renderFilters() {
  $('#f-status').innerHTML = '<option value="">All statuses</option>' + STATUSES.map((s) => `<option value="${s.key}">${s.key} · ${s.label}</option>`).join('');
  const owners = [...new Set(ALL_TASKS.flatMap(ownerNames))].sort();
  $('#f-owner').innerHTML = '<option value="">All owners</option>' + owners.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
}

/* ---------------- Gantt board ---------------- */
const collapsed = new Set();
const expanded = new Set();

function headerHTML() {
  const weeks = WEEK_GROUPS.map((w) =>
    `<div class="g-week" style="flex-basis:${w.days.length * 34}px">
       <span class="wk">${esc(w.label)}</span><span class="rg">${esc(w.range)}</span>
     </div>`).join('');
  const days = DAYS.map((d) =>
    `<div class="g-day ${d.isWeekend ? 'wknd' : ''} ${d.isToday ? 'today' : ''} ${d.isMonthStart ? 'mstart' : ''}">
       <span class="mo">${d.dayNum === 1 || d === DAYS[0] ? MONTHS[d.month] : ''}</span>
       <span class="dn">${d.dayNum}</span>
       <span class="dw">${WD[d.dow]}</span>
     </div>`).join('');
  return `<div class="g-header">
      <div class="g-corner"><span>Task</span><span class="hint">click a day cell to paint it</span></div>
      <div class="g-headcols">
        <div class="g-weeks">${weeks}</div>
        <div class="g-days">${days}</div>
      </div>
    </div>`;
}

function taskRowHTML(t) {
  const kind = schedKind(t.id);
  const cur = statusOf(t.id);
  const done = !!byKey[cur]?.done;

  // day cells
  let cells = '';
  DAYS.forEach((d, i) => {
    const on = isPainted(t.id, d);
    const prev = i > 0 && isPainted(t.id, DAYS[i - 1]);
    const next = i < DAYS.length - 1 && isPainted(t.id, DAYS[i + 1]);
    const color = cur === 'NS' ? 'var(--plan)' : byKey[cur].color;
    const cls = ['g-cell', d.isWeekend ? 'wknd' : '', d.isToday ? 'today' : '',
      on ? 'on' : '', on && !prev ? 'st' : '', on && !next ? 'en' : ''].filter(Boolean).join(' ');
    cells += `<div class="${cls}" data-id="${t.id}" data-iso="${d.iso}" ${on ? `style="--c:${color}"` : ''}></div>`;
  });

  const owners = owis(t).map(([r, w]) => `<span class="owner"><b>${r}</b> ${esc(w)}</span>`).join('');
  const laterTag = kind === 'future' ? `<span class="tag future">→ ${MONTHS[+SCHEDULE[t.id].start.slice(5, 7) - 1]} ${SCHEDULE[t.id].start.slice(0, 4)}</span>`
    : kind === 'conditional' ? `<span class="tag cond">as needed</span>` : '';
  const isExp = expanded.has(t.id);

  return `<div class="g-row ${done ? 'done' : ''}" data-id="${t.id}">
      <div class="g-info">
        <button class="g-title ${isExp ? 'open' : ''}" data-toggle="${t.id}" title="Show details">
          <svg class="tw" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
          <span>${esc(t.title)}</span>${laterTag}
        </button>
        <div class="g-owner-row">
          <select class="status-select" data-id="${t.id}" style="--st:${byKey[cur].color}">
            ${STATUSES.map((o) => `<option value="${o.key}" ${o.key === cur ? 'selected' : ''}>${o.key === 'NS' ? '— Not started' : `${o.key} · ${o.label}`}</option>`).join('')}
          </select>
          ${owners ? `<div class="owner-tags">${owners}</div>` : ''}
        </div>
      </div>
      ${cells}
    </div>${isExp ? detailHTML(t) : ''}`;
}

function descHTML(id) {
  const d = DESCRIPTIONS[id];
  if (!d) return '';
  return `<div class="desc-block"><p class="th">${esc(d.th)}</p><p class="en">${esc(d.en)}</p></div>`;
}

function detailHTML(t) {
  let inner = descHTML(t.id);
  if (t.lines?.length) inner += `<ul class="lines">${t.lines.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (t.detail) {
    inner += `<div class="detail-groups">` + Object.entries(t.detail).map(([g, items]) =>
      `<div class="detail-group"><div class="gh">${esc(g)}</div><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('') + `</div>`;
  }
  if (t.remarks?.length) inner += `<div class="remarks"><div class="rh">Remarks</div><ul>${t.remarks.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></div>`;
  inner += `<div class="note-row"><span class="ni">✎</span><input class="note-input" data-id="${t.id}" type="text" placeholder="Add a note or update…" value="${esc(noteOf(t.id))}"></div>`;
  return `<div class="g-detail" data-detail="${t.id}"><div class="g-detail-in">${inner}</div></div>`;
}

function msProgress(m) {
  const done = m.tasks.filter((t) => byKey[statusOf(t.id)]?.done).length;
  return { done, total: m.tasks.length, pct: m.tasks.length ? Math.round((done / m.tasks.length) * 100) : 0 };
}

function matches(t) {
  const q = $('#f-search').value.trim().toLowerCase();
  const fs = $('#f-status').value, fo = $('#f-owner').value;
  const hay = [t.title, ...(t.lines || []), ...Object.values(t.detail || {}).flat(), ...(t.remarks || []), ...ownerNames(t), noteOf(t.id)].join(' ').toLowerCase();
  return (!q || hay.includes(q)) && (!fs || statusOf(t.id) === fs) && (!fo || ownerNames(t).includes(fo));
}

function rebuildBoard() {
  const wrap = $('#gantt-wrap');
  const prevScroll = wrap ? wrap.scrollLeft : 0;
  let html = headerHTML();
  let anyVisible = false;

  for (const m of MILESTONES) {
    const visTasks = m.tasks.filter(matches);
    if (!visTasks.length) continue;
    anyVisible = true;
    const p = msProgress(m);
    const isColl = collapsed.has(m.id);
    html += `<div class="g-msrow ${isColl ? 'collapsed' : ''}" data-ms="${m.id}">
        <div class="g-mshead">
          <svg class="cw" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          <span class="mno">${esc(m.no)}</span>
          <span class="mname">${esc(m.name)}</span>
          <span class="mphase">${esc(m.phase || '')}</span>
          <span class="mprog"><span class="mbar"><i style="width:${p.pct}%"></i></span>${p.done}/${p.total}</span>
        </div>
      </div>`;
    if (!isColl) html += visTasks.map(taskRowHTML).join('');
  }

  const inner = `<div class="gantt">${html}</div>`;
  if (wrap) wrap.innerHTML = inner;
  $('#empty').style.display = anyVisible ? 'none' : 'block';
  if (wrap) wrap.scrollLeft = prevScroll;
}

/* light refresh (hero + progress) without full rebuild is folded into rebuild */
function refreshAll() { renderHero(); rebuildBoard(); }

/* ---------------- interactions (event delegation) ---------------- */
function wireBoard() {
  const wrap = $('#gantt-wrap');
  wrap.addEventListener('click', (e) => {
    const cell = e.target.closest('.g-cell');
    if (cell) { const id = cell.dataset.id, iso = cell.dataset.iso; setDay(id, iso, !isPainted(id, DAYS.find((d) => d.iso === iso))); rebuildBoard(); return; }
    const title = e.target.closest('.g-title');
    if (title) { const id = title.dataset.toggle; expanded.has(id) ? expanded.delete(id) : expanded.add(id); rebuildBoard(); return; }
    const ms = e.target.closest('.g-mshead');
    if (ms) { const id = ms.parentElement.dataset.ms; collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id); rebuildBoard(); return; }
  });
  wrap.addEventListener('change', (e) => {
    const sel = e.target.closest('.status-select');
    if (sel) { setStatus(sel.dataset.id, sel.value); refreshAll(); toast(`Status → ${byKey[sel.value].label}`); return; }
    const note = e.target.closest('.note-input');
    if (note) { setNote(note.dataset.id, note.value.trim()); toast('Note saved'); }
  });
}

/* ---------------- toolbar ---------------- */
function wireToolbar() {
  $('#f-search').addEventListener('input', rebuildBoard);
  $('#f-status').addEventListener('change', rebuildBoard);
  $('#f-owner').addEventListener('change', rebuildBoard);
  $('#expand-all').addEventListener('click', () => { collapsed.clear(); rebuildBoard(); });
  $('#collapse-all').addEventListener('click', () => { MILESTONES.forEach((m) => collapsed.add(m.id)); rebuildBoard(); });

  $('#export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ project: PROJECT.title, savedAt: new Date().toISOString(), state }, null, 2)], { type: 'application/json' });
    const a = el('a'); a.href = URL.createObjectURL(blob); a.download = 'thaiaudio-p2-tracker.json'; a.click(); URL.revokeObjectURL(a.href); toast('Progress exported');
  });
  $('#import').addEventListener('click', () => $('#import-file').click());
  $('#import-file').addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(r.result); state = d.state || d; saveLocal(); if (remote) remote.replace(state); refreshAll(); toast('Progress imported'); } catch { toast('Could not read that file'); } e.target.value = ''; };
    r.readAsText(file);
  });
  $('#reset').addEventListener('click', () => {
    if (!confirm('Reset all statuses, notes and painted days? This clears saved progress' + (remote ? ' for everyone on this board.' : ' in this browser.'))) return;
    state = {}; saveLocal(); if (remote) remote.replace({}); refreshAll(); toast('Tracker reset');
  });

  const themeBtn = $('#theme');
  const savedTheme = localStorage.getItem('tracker-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  const paint = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark' || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    themeBtn.textContent = dark ? '☀' : '☾';
  };
  paint();
  themeBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next); localStorage.setItem('tracker-theme', next); paint();
  });
}

/* ---------------- Firebase sync (optional) ---------------- */
let remote = null;
function setSync(kind, extra) {
  const b = $('#sync'); if (!b) return;
  const map = {
    local: ['◍', 'Saved locally', 'local'],
    connecting: ['◌', 'Connecting…', 'connecting'],
    synced: ['●', 'Live · synced', 'synced'],
    error: ['▲', 'Sync error', 'error'],
  };
  const [dot, label, cls] = map[kind] || map.local;
  b.className = 'sync ' + cls;
  b.innerHTML = `<span class="sdot">${dot}</span>${label}${extra ? ` · ${extra}` : ''}`;
}
function pushRemote(path, val) { if (remote) remote.update(path, val); }

async function initRemote() {
  if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.projectId) { setSync('local'); return; }
  setSync('connecting');
  try {
    const V = '10.12.5';
    const [appMod, fs] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
    ]);
    const app = appMod.initializeApp(FIREBASE_CONFIG);
    const db = fs.getFirestore(app);
    const ref = fs.doc(db, 'trackers', BOARD_ID);
    await fs.setDoc(ref, { tasks: state || {}, updatedAt: fs.serverTimestamp() }, { merge: true });
    remote = {
      update: (path, val) => fs.updateDoc(ref, { [path]: val, updatedAt: fs.serverTimestamp() }).catch((e) => { console.warn(e); setSync('error'); }),
      replace: (obj) => fs.setDoc(ref, { tasks: obj, updatedAt: fs.serverTimestamp() }).catch((e) => console.warn(e)),
    };
    fs.onSnapshot(ref, (snap) => {
      const d = snap.data();
      if (d && d.tasks) { state = d.tasks; saveLocal(); refreshAll(); }
      setSync('synced');
    }, (err) => { console.warn('Firestore listen failed', err); setSync('error'); });
  } catch (e) {
    console.warn('Firebase unavailable — local mode.', e);
    setSync('local');
  }
}

/* ---------------- Guide tab ---------------- */
function renderGuide() {
  const statusRows = STATUSES.filter((s) => s.key !== 'NS').map((s) =>
    `<div class="gl-row"><span class="gl-code" style="background:${s.color}">${s.key}</span><span>${s.label}</span></div>`).join('');

  const msCards = MILESTONES.map((m) => {
    const d = DESCRIPTIONS[m.id];
    const tasks = m.tasks.map((t) => {
      const td = DESCRIPTIONS[t.id];
      return `<li><b>${esc(t.title)}</b>${td ? `<div class="gt-desc"><span class="th">${esc(td.th)}</span><span class="en">${esc(td.en)}</span></div>` : ''}</li>`;
    }).join('');
    return `<div class="guide-ms">
      <div class="guide-ms-head"><span class="mno">${esc(m.no)}</span>
        <div><h3>${esc(m.name)}</h3><span class="phase">${esc(m.phase || '')}</span></div></div>
      ${d ? `<p class="th">${esc(d.th)}</p><p class="en">${esc(d.en)}</p>` : ''}
      <ul class="guide-tasks">${tasks}</ul>
    </div>`;
  }).join('');

  $('#view-guide').innerHTML = `
    <div class="guide">
      <div class="guide-intro">
        <h2>${esc(PROJECT.title)} — ${esc(PROJECT.subtitle)}</h2>
        <p class="th">โครงการเก็บเสียงพูดภาษาไทย เฟส 2 มีเป้าหมายส่งมอบ <b>500 คู่ที่ผ่านการตรวจ QC</b> โดยแบ่งงานเป็น
          11 milestone ตั้งแต่การเปิดหาผู้เข้าร่วม → ทดลองนำร่อง → ส่งงานรายสัปดาห์ที่คงที่ → ขยายผล → ตรวจ QC และปิดโครงการ
          หน้านี้อธิบายว่าแต่ละช่วงคืออะไรและทำไปเพื่ออะไร</p>
        <p class="en">Thai audio-collection project, Phase 2, delivering <b>500 QC-passed pairs</b> across 11 milestones —
          from acquisition launch → pilots → stable weekly delivery → scale → QC and closure. This page explains what
          each stage is and why it matters.</p>
      </div>

      <div class="guide-how">
        <h3>วิธีใช้ตาราง / How to use the tracker</h3>
        <ul>
          <li><span class="th">แต่ละงานตั้ง <b>สถานะ</b>ได้จากเมนูดรอปดาวน์ (สีของแถบจะเปลี่ยนตามสถานะ)</span>
              <span class="en">Set each task's <b>status</b> from its dropdown — the bar takes the status colour.</span></li>
          <li><span class="th"><b>คลิกช่องวัน</b>ในตารางเพื่อระบาย/ลบวันที่ทำงานเอง (เหมือนกรอกเซลล์ใน Excel)</span>
              <span class="en"><b>Click a day cell</b> to paint/unpaint working days, just like the spreadsheet.</span></li>
          <li><span class="th">คลิก<b>ชื่องาน</b>เพื่อกางดูรายละเอียด เจ้าของงาน และคำอธิบาย</span>
              <span class="en">Click a <b>task title</b> to expand its details, owners, and description.</span></li>
          <li><span class="th">ข้อมูล<b>ซิงก์อัตโนมัติ</b>ทุกคนเมื่อเชื่อม Firebase (ดูสถานะมุมขวาบน)</span>
              <span class="en">Data <b>syncs across everyone</b> when Firebase is connected (see the badge, top-right).</span></li>
        </ul>
        <div class="guide-legend"><div class="gl-title">Status codes</div>${statusRows}</div>
      </div>

      <h3 class="guide-h">Milestones — อธิบายทีละช่วง</h3>
      ${msCards}
    </div>`;
}

let currentView = 'tracker';
function wireTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const v = tab.dataset.view;
      if (v === currentView) return;
      currentView = v;
      document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === tab));
      $('#view-tracker').hidden = v !== 'tracker';
      $('#view-guide').hidden = v !== 'guide';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ---------------- boot ---------------- */
renderHeader();
renderLegend();
renderFilters();
renderGuide();
wireTabs();
// persistent scroll container
$('#board').innerHTML = '<div class="gantt-wrap" id="gantt-wrap"></div>';
renderHero();
rebuildBoard();
wireBoard();
wireToolbar();
setSync('local');
initRemote();
