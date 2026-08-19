/* ------------------------------------------------------------------ *
 * Thai Audio — P2 Project Milestone & Tracker
 * Rendering + interactivity. State (status + notes per task) is kept in
 * localStorage so the board works with no backend; Export/Import moves
 * that state as JSON between browsers or teammates.
 * ------------------------------------------------------------------ */
import { PROJECT, STATUSES, WEEKS, MILESTONES } from './data.js';

const STORE_KEY = 'thaiaudio-p2-tracker.v1';
const byKey = Object.fromEntries(STATUSES.map((s) => [s.key, s]));
const ALL_TASKS = MILESTONES.flatMap((m) => m.tasks.map((t) => ({ ...t, ms: m })));

/* ---------------- state ---------------- */
const load = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
};
let state = load();
const save = () => localStorage.setItem(STORE_KEY, JSON.stringify(state));
const statusOf = (id) => state[id]?.status || 'NS';
const noteOf = (id) => state[id]?.note || '';
const setField = (id, field, val) => {
  state[id] = { ...(state[id] || {}), [field]: val };
  if (field === 'status' && val === 'NS') delete state[id].status;
  if (field === 'note' && !val) delete state[id].note;
  if (state[id] && Object.keys(state[id]).length === 0) delete state[id];
  save();
};

/* ---------------- helpers ---------------- */
const $ = (sel, el = document) => el.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const owis = (t) => {
  const o = t.owners || {};
  const out = [];
  if (o.poc1) out.push(['POC1', o.poc1]);
  if (o.poc2) out.push(['POC2', o.poc2]);
  if (o.mgmt) out.push(['Mgmt', o.mgmt]);
  if (o.ops) out.push(['Ops', o.ops]);
  if (o.ta) out.push(['TA', o.ta]);
  return out;
};
const ownerNames = (t) => owis(t).map(([, v]) => v);

let toastTimer;
const toast = (msg) => {
  let t = $('.toast');
  if (!t) { t = el('div', 'toast'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
};

/* ---------------- metrics ---------------- */
const metrics = () => {
  const total = ALL_TASKS.length;
  let done = 0, active = 0, stopped = 0;
  const dist = Object.fromEntries(STATUSES.map((s) => [s.key, 0]));
  for (const t of ALL_TASKS) {
    const k = statusOf(t.id);
    dist[k]++;
    if (byKey[k]?.done) done++;
    else if (byKey[k]?.stopped) stopped++;
    else if (k !== 'NS') active++;
  }
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { total, done, active, stopped, pct, dist };
};

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
    { n: WEEKS.length, l: 'Weeks mapped', sub: 'Aug 17 – Oct 04' },
  ];
  $('#kpis').innerHTML = kpis.map((k) =>
    `<div class="kpi"><div class="n">${k.n}</div><div class="l">${k.l}</div><div class="sub">${k.sub}</div></div>`
  ).join('');
  renderDistribution(m);
}

function renderDistribution(m) {
  const shown = STATUSES.filter((s) => m.dist[s.key] > 0);
  const bar = shown.map((s) =>
    `<span style="width:${(m.dist[s.key] / m.total) * 100}%;background:${s.color}" title="${s.label}: ${m.dist[s.key]}"></span>`
  ).join('');
  const key = shown.map((s) =>
    `<span class="k"><span class="sw" style="background:${s.color}"></span>${s.label} · ${m.dist[s.key]}</span>`
  ).join('');
  $('#dist').innerHTML =
    `<div class="section-title">Status distribution</div>
     <div class="dist-bar">${bar}</div>
     <div class="dist-key">${key}</div>`;
}

/* ---------------- timeline ---------------- */
function renderWeeks() {
  $('#weeks').innerHTML = WEEKS.map((w) => {
    const now = w.id === PROJECT.currentWeekId;
    return `<div class="week ${now ? 'now' : ''}">
      <div class="wk">${now ? '<span class="dot"></span>' : ''}${w.label}</div>
      <div class="rg">${w.range}</div>
      ${now ? '<div class="now-tag">Current week</div>' : ''}
    </div>`;
  }).join('');
}

/* ---------------- legend ---------------- */
function renderLegend() {
  $('#legend').innerHTML = STATUSES.filter((s) => s.key !== 'NS').map((s) =>
    `<span class="chip"><span class="sw" style="background:${s.color}"></span>${s.key} · ${s.label}</span>`
  ).join('');
}

/* ---------------- filters ---------------- */
function renderFilters() {
  const statusSel = $('#f-status');
  statusSel.innerHTML = '<option value="">All statuses</option>' +
    STATUSES.map((s) => `<option value="${s.key}">${s.key} · ${s.label}</option>`).join('');
  const owners = [...new Set(ALL_TASKS.flatMap(ownerNames))].sort();
  $('#f-owner').innerHTML = '<option value="">All owners</option>' +
    owners.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
}

/* ---------------- milestone + task rendering ---------------- */
function statusSelect(t) {
  const cur = statusOf(t.id);
  const s = byKey[cur];
  const sel = el('select', 'status-select');
  sel.style.setProperty('--st', s.color);
  sel.dataset.id = t.id;
  sel.innerHTML = STATUSES.map((o) =>
    `<option value="${o.key}" ${o.key === cur ? 'selected' : ''}>${o.key === 'NS' ? '— Not started' : `${o.key} · ${o.label}`}</option>`
  ).join('');
  sel.addEventListener('change', () => {
    setField(t.id, 'status', sel.value);
    render();
    toast(`${t.title.slice(0, 40)} → ${byKey[sel.value].label}`);
  });
  return sel;
}

function taskNode(t) {
  const node = el('div', 'task');
  node.dataset.id = t.id;
  const cur = statusOf(t.id);
  if (byKey[cur]?.done) node.classList.add('done');

  // left: status + owners
  const left = el('div', 'task-status');
  left.appendChild(statusSelect(t));
  const tags = owis(t);
  if (tags.length) {
    const ot = el('div', 'owner-tags');
    ot.innerHTML = tags.map(([role, who]) => `<span class="owner"><b>${role}</b> ${esc(who)}</span>`).join('');
    left.appendChild(ot);
  }

  // right: content
  const main = el('div', 'task-main');
  main.appendChild(el('h4', null, esc(t.title)));
  if (t.lines?.length) {
    main.appendChild(el('ul', 'lines', t.lines.map((x) => `<li>${esc(x)}</li>`).join('')));
  }
  if (t.detail) {
    const groups = el('div', 'detail-groups');
    for (const [g, items] of Object.entries(t.detail)) {
      groups.appendChild(el('div', 'detail-group',
        `<div class="gh">${esc(g)}</div><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`));
    }
    main.appendChild(groups);
  }
  if (t.remarks?.length) {
    main.appendChild(el('div', 'remarks',
      `<div class="rh">Remarks</div><ul>${t.remarks.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`));
  }
  // note
  const noteRow = el('div', 'note-row');
  noteRow.innerHTML = '<span class="ni" title="Your note">✎</span>';
  const input = el('input', 'note-input');
  input.type = 'text';
  input.placeholder = 'Add a note or update…';
  input.value = noteOf(t.id);
  input.addEventListener('change', () => { setField(t.id, 'note', input.value.trim()); toast('Note saved'); });
  noteRow.appendChild(input);
  main.appendChild(noteRow);

  node.appendChild(left);
  node.appendChild(main);
  return node;
}

function msProgress(m) {
  const tasks = m.tasks;
  const done = tasks.filter((t) => byKey[statusOf(t.id)]?.done).length;
  return { done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
}

const collapsed = new Set();
function milestoneNode(m) {
  const p = msProgress(m);
  const node = el('div', 'milestone');
  node.dataset.id = m.id;
  if (collapsed.has(m.id)) node.classList.add('collapsed');

  const head = el('div', 'ms-head');
  head.innerHTML = `
    <div class="ms-no">${esc(m.no)}</div>
    <div class="ms-title"><h3>${esc(m.name)}</h3><div class="phase">${esc(m.phase || '')}</div></div>
    <div class="ms-meta">
      <div class="ms-prog">
        <div class="bar"><i style="width:${p.pct}%"></i></div>
        <div class="txt">${p.done}/${p.total} done</div>
      </div>
      <svg class="caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
    </div>`;
  head.addEventListener('click', () => {
    node.classList.toggle('collapsed');
    if (node.classList.contains('collapsed')) collapsed.add(m.id); else collapsed.delete(m.id);
  });
  node.appendChild(head);

  const body = el('div', 'ms-body');
  m.tasks.forEach((t) => body.appendChild(taskNode(t)));
  node.appendChild(body);
  return node;
}

function renderBoard() {
  const board = $('#board');
  board.innerHTML = '';
  MILESTONES.forEach((m) => board.appendChild(milestoneNode(m)));
  applyFilters();
}

/* ---------------- filtering ---------------- */
function applyFilters() {
  const q = $('#f-search').value.trim().toLowerCase();
  const fs = $('#f-status').value;
  const fo = $('#f-owner').value;
  let anyGlobal = false;

  MILESTONES.forEach((m) => {
    const msNode = $(`.milestone[data-id="${m.id}"]`);
    let visible = 0;
    m.tasks.forEach((t) => {
      const tn = $(`.task[data-id="${t.id}"]`, msNode);
      const hay = [t.title, ...(t.lines || []), ...Object.values(t.detail || {}).flat(),
        ...(t.remarks || []), ...ownerNames(t), noteOf(t.id)].join(' ').toLowerCase();
      const okQ = !q || hay.includes(q);
      const okS = !fs || statusOf(t.id) === fs;
      const okO = !fo || ownerNames(t).includes(fo);
      const show = okQ && okS && okO;
      tn.classList.toggle('hide', !show);
      if (show) { visible++; anyGlobal = true; }
    });
    msNode.style.display = visible ? '' : 'none';
  });
  $('#empty').style.display = anyGlobal ? 'none' : 'block';
}

/* ---------------- top-level render ---------------- */
function render() {
  renderHero();
  // refresh milestone progress bars + task done-state without losing focus
  MILESTONES.forEach((m) => {
    const msNode = $(`.milestone[data-id="${m.id}"]`);
    if (!msNode) return;
    const p = msProgress(m);
    $('.ms-prog .bar > i', msNode).style.width = p.pct + '%';
    $('.ms-prog .txt', msNode).textContent = `${p.done}/${p.total} done`;
    m.tasks.forEach((t) => {
      const tn = $(`.task[data-id="${t.id}"]`, msNode);
      const sel = $('.status-select', tn);
      sel.style.setProperty('--st', byKey[statusOf(t.id)].color);
      tn.classList.toggle('done', !!byKey[statusOf(t.id)]?.done);
    });
  });
  applyFilters();
}

/* ---------------- toolbar actions ---------------- */
function wireToolbar() {
  $('#f-search').addEventListener('input', applyFilters);
  $('#f-status').addEventListener('change', applyFilters);
  $('#f-owner').addEventListener('change', applyFilters);

  $('#expand-all').addEventListener('click', () => {
    collapsed.clear();
    document.querySelectorAll('.milestone').forEach((n) => n.classList.remove('collapsed'));
  });
  $('#collapse-all').addEventListener('click', () => {
    MILESTONES.forEach((m) => collapsed.add(m.id));
    document.querySelectorAll('.milestone').forEach((n) => n.classList.add('collapsed'));
  });

  $('#export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ project: PROJECT.title, savedAt: new Date().toISOString(), state }, null, 2)],
      { type: 'application/json' });
    const a = el('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'thaiaudio-p2-tracker.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Progress exported');
  });

  $('#import').addEventListener('click', () => $('#import-file').click());
  $('#import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        state = data.state || data;
        save(); render();
        toast('Progress imported');
      } catch { toast('Could not read that file'); }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  $('#reset').addEventListener('click', () => {
    if (!confirm('Reset all statuses and notes? This clears saved progress in this browser.')) return;
    state = {}; save(); render();
    document.querySelectorAll('.status-select').forEach((s) => { s.value = 'NS'; });
    document.querySelectorAll('.note-input').forEach((n) => { n.value = ''; });
    toast('Tracker reset');
  });

  // theme toggle
  const themeBtn = $('#theme');
  const savedTheme = localStorage.getItem('tracker-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  const paintThemeIcon = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    themeBtn.textContent = dark ? '☀' : '☾';
  };
  paintThemeIcon();
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tracker-theme', next);
    paintThemeIcon();
  });
}

/* ---------------- boot ---------------- */
renderHeader();
renderWeeks();
renderLegend();
renderFilters();
renderBoard();
renderHero();
wireToolbar();
