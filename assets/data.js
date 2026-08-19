/* ------------------------------------------------------------------ *
 * Thai Audio — P2 Project Milestone & Tracker
 * Data model, transcribed from the "Mile_Stone" worksheet.
 *
 * Everything the tracker renders lives here so the plan can be edited
 * in one place. Task `id`s are stable strings — the tracker keys each
 * task's saved status on its id in localStorage, so DO NOT renumber an
 * existing id or its saved progress detaches. Add new ids freely.
 * ------------------------------------------------------------------ */

// Header shown at the top of the board.
export const PROJECT = {
  title: 'Thai Audio — P2',
  subtitle: 'Project Milestone & Tracker',
  updatedOn: '18 August 2026',
  goal: '500 QC-Passed Pairs',
  currentWeekId: 'wk0',
};

// The status vocabulary from the sheet's legend (A1:B11).
// `key` is the code stored per task; `done`/`stopped` drive the progress maths.
export const STATUSES = [
  { key: 'NS', label: 'Not started',        color: '#94a3b8' }, // synthetic default (no code in sheet)
  { key: 'FL', label: 'Follow up with TL',  color: '#8b5cf6' },
  { key: 'WD', label: 'Working day',         color: '#64748b' },
  { key: 'EM', label: 'E-meeting / meeting', color: '#06b6d4' },
  { key: 'IP', label: 'In progress',         color: '#3b82f6' },
  { key: 'PI', label: 'Pending info',        color: '#f59e0b' },
  { key: 'WQ', label: 'Waiting for client',  color: '#f97316' },
  { key: 'OH', label: 'On hold',             color: '#a1a1aa' },
  { key: 'ES', label: 'Escalated',           color: '#ef4444' },
  { key: 'TC', label: 'Task completed',      color: '#22c55e', done: true },
  { key: 'CA', label: 'Cancelled',           color: '#6b7280', stopped: true },
  { key: 'DL', label: 'Delayed',             color: '#e11d48' },
];

// The continuous day grid, like the sheet's calendar columns.
// 7 weeks of daily columns starting Mon 17 Aug 2026 → Sun 04 Oct 2026.
export const GRID = { start: '2026-08-17', weeks: 7, today: '2026-08-19' };

/**
 * When each task is scheduled on the day grid (its Gantt bar).
 *   { start, end }             — a continuous band of days (inclusive, ISO).
 *   { start, end, weekdays }   — only those weekdays inside the band
 *                                 (0 = Sun … 6 = Sat), for recurring cadences.
 *   { conditional: true }      — no fixed dates; an "as needed" playbook.
 * Tasks whose band starts after the grid ends are shown as a later phase.
 * These are sensible defaults — every cell is click-editable in the board.
 */
export const SCHEDULE = {
  'm0-setup':    { start: '2026-08-17', end: '2026-08-21' },

  'm1-engine1':  { start: '2026-08-24', end: '2026-08-31' },
  'm1-checkin':  { start: '2026-08-24', end: '2026-08-31' },
  'm1-engine2':  { start: '2026-08-24', end: '2026-09-06' },
  'm1-tier1':    { start: '2026-08-24', end: '2026-09-06' },
  'm1-tier2':    { start: '2026-08-31', end: '2026-09-06' },
  'm1-tier3':    { start: '2026-08-31', end: '2026-09-06' },
  'm1-tier4':    { start: '2026-09-01', end: '2026-09-06' },
  'm1-tier5':    { start: '2026-09-01', end: '2026-09-06' },
  'm1-tier6':    { start: '2026-09-01', end: '2026-09-06' },

  'm2-cohort':   { start: '2026-09-01', end: '2026-09-06' },
  'm2-day1':     { start: '2026-09-01', end: '2026-09-01' },
  'm2-day2':     { start: '2026-09-02', end: '2026-09-02' },
  'm2-day3':     { start: '2026-09-03', end: '2026-09-03' },

  'm3-pilot':    { start: '2026-09-07', end: '2026-09-13' },

  'm4-target':   { start: '2026-09-14', end: '2026-10-04' },
  'm4-mon':      { start: '2026-09-14', end: '2026-10-04', weekdays: [1] },
  'm4-tuewed':   { start: '2026-09-14', end: '2026-10-04', weekdays: [2, 3] },
  'm4-thu':      { start: '2026-09-14', end: '2026-10-04', weekdays: [4] },
  'm4-fri':      { start: '2026-09-14', end: '2026-10-04', weekdays: [5] },

  'm5-review':   { start: '2026-09-14', end: '2026-09-18' },
  'm5-decision': { start: '2026-09-18', end: '2026-09-20' },

  // Beyond the near-term grid — shown as later phases.
  'm6-m2':       { start: '2026-10-05', end: '2026-11-01' },
  'm6-m3':       { start: '2026-11-02', end: '2026-11-29' },
  'm6-m4':       { start: '2026-11-30', end: '2026-12-27' },

  'm7-green':    { conditional: true },
  'm7-amber':    { conditional: true },
  'm7-red':      { conditional: true },
  'm7-critical': { conditional: true },

  'm8-final':          { start: '2026-12-28', end: '2027-01-24' },
  'm9-confirm':        { start: '2027-01-25', end: '2027-01-31' },
  'm10-obligations':   { start: '2027-02-01', end: '2027-02-07' },
  'm10-reconcile':     { start: '2027-02-01', end: '2027-02-07' },
  'm11-review':        { start: '2027-02-08', end: '2027-02-14' },
  'm11-relationships': { start: '2027-02-08', end: '2027-02-14' },
  'm11-deliverables':  { start: '2027-02-15', end: '2027-02-21' },
};

// Near-term weekly calendar strip (row 12–15 of the sheet).
export const WEEKS = [
  { id: 'wk0', label: 'WK 0', range: 'Aug 17 – Aug 23', start: '2026-08-17' },
  { id: 'w1',  label: 'W1',   range: 'Aug 24 – Aug 30', start: '2026-08-24' },
  { id: 'w2',  label: 'W2',   range: 'Sep 01 – Sep 06', start: '2026-09-01' },
  { id: 'w3',  label: 'W3',   range: 'Sep 07 – Sep 13', start: '2026-09-07' },
  { id: 'w4',  label: 'W4',   range: 'Sep 14 – Sep 20', start: '2026-09-14' },
  { id: 'w5',  label: 'W5',   range: 'Sep 21 – Sep 27', start: '2026-09-21' },
  { id: 'w6',  label: 'W6',   range: 'Sep 28 – Oct 04', start: '2026-09-28' },
];

// Owner columns from the sheet header (POC 1 / POC 2 / Management / Ops / TA).
// Each task lists the owners that carry it and, where the sheet spelled them
// out, the checklist that owner is responsible for.
const L = (...items) => items;

export const MILESTONES = [
  {
    id: 'm0',
    no: '0',
    name: 'Project Readiness & Governance Setup',
    phase: 'Pre-launch · WK 0',
    tasks: [
      {
        id: 'm0-setup',
        title: 'Project Readiness & Governance Setup',
        owners: { poc1: 'UpUp' },
        weeks: ['wk0'],
        detail: {
          Management: L(
            'Confirm project owner',
            'Confirm 6 Operations + 1 TA — resource allocation',
            'Confirm weekly / monthly target',
            'Confirm escalation process',
            'Confirm gender tracking',
            'Confirm reporting cadence',
          ),
          Ops: L(
            'Review existing participant journey',
            'Reduce unnecessary documents and manual steps',
            'Simplify participant instructions',
            'Confirm FunCrowd workflow',
            'Prepare troubleshooting guide',
            'Prepare participant FAQ',
            'Prepare 3-day recording support model',
            'Confirm 14-day final participant DDL',
          ),
          TA: L(
            'Finalize Direct Hunting model',
            'Finalize Institutional Outreach 6-Tier model',
            'Prepare referral campaign',
            'Build institutional target list',
            'Prepare outreach introduction pack',
            'Prepare lead / institution trackers',
          ),
        },
      },
    ],
  },

  {
    id: 'm1',
    no: '1',
    name: 'Acquisition Launch',
    phase: 'Launch · W1–W2',
    tasks: [
      {
        id: 'm1-engine1',
        title: 'Engine 1 — Direct Hunting',
        owners: { poc1: 'ALL' },
        weeks: ['w1', 'w2'],
        lines: L(
          'Existing participant referrals',
          'Personal networks',
          'PM / Acting TL networks',
          'Employee referrals',
          'Facebook / LINE communities',
          'Alumni groups',
          'Existing participant reactivation',
        ),
        detail: {
          Ops: L(
            'SOP / participant guide ready',
            'Tracking system ready',
            'Acquisition channels ready',
            'Roles assigned',
            'First participant pipeline available',
            'First institutional targets identified',
          ),
        },
        remarks: L(
          'Referral incentive — 1–4 successful pairs: THB 80 / pair',
          '5th successful pair onward: THB 100 / pair',
          'Referral incentive should be linked to successful completion / QC-passed status, not registration only.',
        ),
      },
      {
        id: 'm1-checkin',
        title: 'Check-in Progress',
        owners: { poc1: 'ALL' },
        weeks: ['w1', 'w2'],
        detail: { Ops: L('Daily Report'), TA: L('Daily Report') },
      },
      {
        id: 'm1-engine2',
        title: 'Engine 2 — Institutional Outreach',
        owners: { poc1: 'ALL' },
        weeks: ['w1', 'w2'],
      },
      {
        id: 'm1-tier1',
        title: 'Tier 1 — High-density / community-based networks',
        owners: { poc1: 'UpUp' },
        lines: L(
          'Recreation Centers',
          'Public Health Centers',
          'Elderly Networks',
          'Elderly Schools',
          'NHA Communities',
          'Temple-Based Communities',
        ),
      },
      {
        id: 'm1-tier2',
        title: 'Tier 2 — Universities',
        detail: { Ops: L(
          'Direct Hunting active', 'Referral campaign active', 'Institutional outreach active',
          'First gatekeepers secured', 'First institutional cohort scheduled', 'Sufficient participant pipeline created',
        ) },
      },
      {
        id: 'm1-tier3',
        title: 'Tier 3 — Vocational / Technical Colleges',
        detail: { Ops: L(
          'Direct Hunting active', 'Referral campaign active', 'Institutional outreach active',
          'First gatekeepers secured', 'First institutional cohort scheduled', 'Sufficient participant pipeline created',
        ) },
      },
      {
        id: 'm1-tier4',
        title: 'Tier 4 — Companies / Factories',
        detail: { Ops: L(
          'Direct Hunting active', 'Referral campaign active', 'Institutional outreach active',
          'First gatekeepers secured', 'First institutional cohort scheduled', 'Sufficient participant pipeline created',
        ) },
      },
      {
        id: 'm1-tier5',
        title: 'Tier 5 — Offices / BPO / Business Communities',
        detail: { Ops: L(
          'Direct Hunting active', 'Referral campaign active', 'Institutional outreach active',
          'First gatekeepers secured', 'First institutional cohort scheduled', 'Sufficient participant pipeline created',
        ) },
      },
      {
        id: 'm1-tier6',
        title: 'Tier 6 — General Community Organizations',
      },
    ],
  },

  {
    id: 'm2',
    no: '2',
    name: 'First Cohort / Operational Pilot',
    phase: 'Pilot',
    tasks: [
      {
        id: 'm2-cohort',
        title: 'Tier 1 Elderly / Community Cohort',
        detail: { Ops: L('Start with approximately 25 pairs minimum') },
      },
      {
        id: 'm2-day1',
        title: 'Day 1',
        lines: L('Registration', 'App setup', 'Pair confirmation', 'Test call — 2 topics'),
      },
      {
        id: 'm2-day2',
        title: 'Day 2',
        lines: L('Troubleshooting', '2–3 additional topics'),
      },
      {
        id: 'm2-day3',
        title: 'Day 3',
        lines: L('Remaining topics', 'Complete 7 / 7', 'Upload', 'Submission check'),
        detail: { Ops: L(
          'Attendance', 'Activation', 'Completion', 'Ops workload',
          'Technical issues', 'Dropout rate', 'QC pass rate', 'Gender balance',
        ) },
      },
    ],
  },

  {
    id: 'm3',
    no: '3',
    name: 'University / Secondary Channel Pilot',
    phase: 'Pilot',
    tasks: [
      {
        id: 'm3-pilot',
        title: '25 pair minimum',
        detail: { Ops: L(
          'Leads generated', 'Activation', 'Completion', 'QC',
          'Ops effort per pair', 'Cost / effort per QC-passed pair',
        ) },
      },
    ],
  },

  {
    id: 'm4',
    no: '4',
    name: 'Stable Weekly Delivery',
    phase: 'Steady state · ~25 QC-passed pairs / week',
    tasks: [
      { id: 'm4-target', title: '~25 QC-Passed Pairs (weekly)' },
      {
        id: 'm4-mon',
        title: 'Monday',
        lines: L('Review target', 'Review active pipeline', 'Review gender gap', 'Confirm cohort schedule'),
        detail: { Ops: L(
          'Weekly output becomes predictable', 'Acquisition pipeline remains sufficient',
          'No dependency on one single source', 'Participant completion distributed throughout the week',
          'QC results remain sustainable',
        ) },
      },
      {
        id: 'm4-tuewed',
        title: 'Tuesday – Wednesday',
        lines: L('Acquisition', 'Institutional activities', 'Recording support'),
      },
      {
        id: 'm4-thu',
        title: 'Thursday',
        lines: L('Completion push', 'Participant recovery', 'Re-recording support'),
      },
      {
        id: 'm4-fri',
        title: 'Friday',
        lines: L('QC / delivery review', 'Weekly RCA', 'Next-week pipeline preparation'),
      },
    ],
  },

  {
    id: 'm5',
    no: '5',
    name: 'Month 1 Baseline Review',
    phase: 'Review · 100 QC-passed pairs',
    tasks: [
      {
        id: 'm5-review',
        title: 'Review',
        detail: { Ops: L(
          'Evaluate each acquisition source:', 'Leads', 'Registered pairs', 'Activation',
          'Completion', 'QC pass rate', 'Gender contribution', 'Operational effort',
          'Acquisition effort', 'Completion time',
        ) },
      },
      {
        id: 'm5-decision',
        title: 'Channel Decision',
        detail: { Ops: L(
          'Scale — strong conversion + strong QC',
          'Maintain — stable performance',
          'Improve — good volume but weak conversion',
          'Reduce / Stop — low conversion + high effort',
          'Outcome — Month 1 becomes the baseline for resource allocation in Months 2–5.',
        ) },
      },
    ],
  },

  {
    id: 'm6',
    no: '6',
    name: 'Scale & Optimization',
    phase: 'Months 2–4',
    tasks: [
      {
        id: 'm6-m2',
        title: 'Month 2 — Cumulative Target: 200 Pairs',
        detail: { Ops: L(
          'Scale best-performing institutions', 'Expand successful referral channels',
          'Repeat successful cohort model', 'Improve weak conversion points',
        ) },
      },
      {
        id: 'm6-m3',
        title: 'Month 3 — Cumulative Target: 300 Pairs',
        detail: { Ops: L(
          'Expand institutional coverage', 'Add additional gatekeepers', 'Optimize staffing model',
          'Replace weak acquisition sources', 'Improve predictability of weekly delivery',
        ) },
      },
      {
        id: 'm6-m4',
        title: 'Month 4 — Cumulative Target: 400 Pairs',
        detail: { Ops: L(
          'Highest-performing channels only', 'Gender-gap control', 'QC improvement',
          'Aging pipeline cleanup', 'Maintain sufficient participant buffer',
        ) },
      },
    ],
  },

  {
    id: 'm7',
    no: '7',
    name: 'Weekly Recovery & Backup Activation',
    phase: 'Risk playbook',
    tasks: [
      {
        id: 'm7-green',
        title: 'Green — Forecast ≥ 25 pairs',
        detail: { Ops: L('Continue BAU and prepare next-week pipeline.') },
      },
      {
        id: 'm7-amber',
        title: 'Amber — Forecast 20–24 pairs',
        detail: { Ops: L(
          'Increase referrals', 'Push active participants',
          'Activate additional Direct Hunting', 'Pull forward upcoming participants',
        ) },
      },
      {
        id: 'm7-red',
        title: 'Red — Forecast 15–19 pairs',
        detail: { Ops: L(
          'PM + TA recovery plan', 'Activate additional institution',
          'Increase participant follow-up', 'Add Activation Clinic', 'Use existing participant network',
        ) },
      },
      {
        id: 'm7-critical',
        title: 'Critical — Forecast < 15 pairs',
        detail: { Ops: L(
          'Activate all available Direct Hunting sources', 'Open backup institutional channel',
          'Reallocate Ops support toward completion', 'Pull forward next cohort',
          'Escalate delivery risk', 'Conduct immediate funnel RCA',
        ) },
      },
    ],
  },

  {
    id: 'm8',
    no: '8',
    name: 'Final Month / Closing Push',
    phase: 'Final month · 500 pairs',
    tasks: [
      {
        id: 'm8-final',
        title: 'Final Target: 500 QC-Passed Pairs',
        detail: { Ops: L(
          'Continue only proven acquisition sources', 'Close remaining gender gap',
          'Replace inactive participants', 'Complete outstanding recordings',
          'Complete outstanding re-recordings', 'Resolve QC-pending cases',
          'Close referral payments', 'Stop unnecessary new recruitment once sufficient buffer is secured',
        ) },
      },
    ],
  },

  {
    id: 'm9',
    no: '9',
    name: 'QC & Final Acceptance',
    phase: 'Acceptance',
    tasks: [
      {
        id: 'm9-confirm',
        title: 'Confirm the 500-pair requirement has been successfully delivered',
        detail: { Ops: L(
          '500 QC-Passed Pairs', 'Required gender ratio achieved',
          'All required recording topics completed', 'No unresolved QC cases',
          'Required re-recordings completed', 'Participant records complete',
          'Submission tracker reconciled',
        ) },
      },
    ],
  },

  {
    id: 'm10',
    no: '10',
    name: 'Participant & Referral Payment Closure',
    phase: 'Closure',
    tasks: [
      {
        id: 'm10-obligations',
        title: 'Ensure all financial obligations are completed',
        detail: { Ops: L(
          'Participant payment status', 'Referral incentive status', 'Failed / rejected cases',
          'Re-recorded cases', 'Outstanding payment disputes',
        ) },
      },
      {
        id: 'm10-reconcile',
        title: 'Final Reconciliation',
        lines: L('Participant → Pair → QC Status → Payable Status → Payment Confirmation'),
      },
    ],
  },

  {
    id: 'm11',
    no: '11',
    name: 'Project Closure',
    phase: 'Closure',
    tasks: [
      {
        id: 'm11-review',
        title: 'Final Project Review',
        detail: { Ops: L(
          'Final output reconciliation', 'Final QC results', 'Acquisition performance by channel',
          'Institutional performance comparison', 'Referral performance', 'Completion rate',
          'Gender performance', 'Cost / effort analysis', 'Operational RCA', 'Key lessons learned',
        ) },
      },
      {
        id: 'm11-relationships',
        title: 'Institutional Relationship Closure',
        detail: { Ops: L(
          'Thank institution / coordinator', 'Maintain contact information',
          'Identify potential future collaboration', 'Record institution performance for future projects',
        ) },
      },
      {
        id: 'm11-deliverables',
        title: 'Final Deliverables',
        detail: { Ops: L(
          '500 QC-Passed Pairs', 'Final Participant Tracker', 'Final Payment Tracker',
          'Acquisition Channel Performance Report', 'Institutional Outreach Performance Report',
          'Project RCA & Lessons Learned', 'Final Project Closure Report',
        ) },
      },
    ],
  },
];

/**
 * Plain-language explanations ("what is this / why") for the Guide tab and the
 * description line inside each expanded task. Keyed by milestone id and task id.
 * Each entry has Thai (th) + English (en). Edit freely — purely descriptive.
 */
export const DESCRIPTIONS = {
  // ---- milestones ----
  m0:  { th: 'เตรียมความพร้อมและวางโครงสร้างการกำกับดูแลก่อนเริ่มโครงการ — ยืนยันเจ้าของงาน ทีม เป้าหมาย กระบวนการ และเตรียมคู่มือ/เครื่องมือทั้งหมด',
         en: 'Lay the groundwork before launch — confirm ownership, team, targets and processes, and get every guide and tracker ready.' },
  m1:  { th: 'เปิดสองช่องทางหาผู้เข้าร่วม — การหาโดยตรง และการเข้าถึงผ่านองค์กร (6 ระดับ)',
         en: 'Turn on the two engines for finding participants — direct hunting and institutional outreach (6 tiers).' },
  m2:  { th: 'ทดลองรันกลุ่มแรก (อย่างน้อย 25 คู่) ภายใน 3 วัน เพื่อทดสอบกระบวนการทั้งหมดตั้งแต่ต้นจนจบ',
         en: 'Run the first small group (≥25 pairs) over 3 days to test the whole flow end-to-end.' },
  m3:  { th: 'ทดลองช่องทางที่สอง (มหาวิทยาลัย) อีก 25 คู่ เพื่อเทียบผลและต้นทุน',
         en: 'Pilot a second channel (universities) with another 25 pairs to compare performance and cost.' },
  m4:  { th: 'เข้าสู่จังหวะส่งงานรายสัปดาห์ที่คงที่ (~25 คู่ที่ผ่าน QC/สัปดาห์) ตามตาราง จันทร์–ศุกร์',
         en: 'Reach a repeatable weekly rhythm (~25 QC-passed pairs/week) on a fixed Mon–Fri cadence.' },
  m5:  { th: 'เมื่อครบ ~100 คู่ ทบทวนทุกช่องทางแล้วตัดสินใจ ขยาย/คงไว้/ปรับปรุง/หยุด',
         en: 'After ~100 pairs, review every channel and decide: scale, maintain, improve, or stop.' },
  m6:  { th: 'ขยายทีละเดือน (200 → 300 → 400) โดยเพิ่มสิ่งที่ได้ผลและตัดสิ่งที่ไม่ได้ผล',
         en: 'Grow month by month (200 → 300 → 400) by scaling what works and cutting what does not.' },
  m7:  { th: 'คู่มือรับมือความเสี่ยงรายสัปดาห์ — แผนปฏิบัติ เขียว/เหลือง/แดง/วิกฤต ตามยอดคาดการณ์',
         en: 'A weekly risk playbook — Green/Amber/Red/Critical actions based on the forecast.' },
  m8:  { th: 'โค้งสุดท้ายเพื่อให้ครบ 500 คู่ที่ผ่าน QC และเก็บงานค้างทั้งหมด',
         en: 'Final push to hit 500 QC-passed pairs and close every remaining gap.' },
  m9:  { th: 'ยืนยันว่าส่งครบ 500 คู่และผ่านการตรวจ QC ทั้งหมด',
         en: 'Confirm the 500-pair requirement is fully delivered and passes all QC checks.' },
  m10: { th: 'เคลียร์ค่าตอบแทนผู้เข้าร่วมและค่าแนะนำทั้งหมด พร้อมกระทบยอดทุกเคส',
         en: 'Settle all participant and referral payments, and reconcile every case.' },
  m11: { th: 'ปิดโครงการ — ทบทวนผล ปิดความสัมพันธ์กับองค์กร และส่งมอบรายงานทั้งหมด',
         en: 'Wrap up — final review, relationship closure, and all deliverables/reports.' },

  // ---- tasks ----
  'm0-setup':    { th: 'งานตั้งต้นก่อนเริ่ม: ยืนยันเจ้าของโครงการ ล็อกทีมและเป้าหมาย และเตรียมกระบวนการ คู่มือ และตัวติดตามให้พร้อม',
                   en: 'The groundwork before launch: confirm the owner, lock the team and targets, and prepare every process, guide and tracker.' },

  'm1-engine1':  { th: 'เครื่องยนต์ที่ 1 — หาผู้เข้าร่วมโดยตรงผ่านการบอกต่อและเครือข่ายส่วนตัว/ชุมชน',
                   en: 'Engine 1 — find participants directly through referrals and personal/community networks.' },
  'm1-checkin':  { th: 'เช็คอินและรายงานความคืบหน้าการหาผู้เข้าร่วมทุกวัน',
                   en: 'Daily check-in and reporting on acquisition progress.' },
  'm1-engine2':  { th: 'เครื่องยนต์ที่ 2 — เข้าถึงผู้เข้าร่วมผ่านองค์กร แบ่งเป็น 6 ระดับ',
                   en: 'Engine 2 — reach participants through institutions, organized into 6 tiers.' },
  'm1-tier1':    { th: 'ระดับ 1 — สถานที่ชุมชน/ผู้สูงอายุ (กระจุกตัวมาก เข้าถึงง่ายสุด)',
                   en: 'Tier 1 — community / elderly venues (highest density, easiest to reach).' },
  'm1-tier2':    { th: 'ระดับ 2 — มหาวิทยาลัย', en: 'Tier 2 — universities.' },
  'm1-tier3':    { th: 'ระดับ 3 — วิทยาลัยอาชีวะ/เทคนิค', en: 'Tier 3 — vocational / technical colleges.' },
  'm1-tier4':    { th: 'ระดับ 4 — บริษัทและโรงงาน', en: 'Tier 4 — companies and factories.' },
  'm1-tier5':    { th: 'ระดับ 5 — ออฟฟิศ BPO และชุมชนธุรกิจ', en: 'Tier 5 — offices, BPO and business communities.' },
  'm1-tier6':    { th: 'ระดับ 6 — องค์กรชุมชนทั่วไป', en: 'Tier 6 — general community organizations.' },

  'm2-cohort':   { th: 'กลุ่มจริงกลุ่มแรกที่รันผ่านกระบวนการ — เริ่มอย่างน้อย 25 คู่',
                   en: 'The first real group run through the process — start with at least 25 pairs.' },
  'm2-day1':     { th: 'วันที่ 1 — ลงทะเบียน ตั้งค่าแอป ยืนยันคู่ และทดลองอัด 2 หัวข้อ',
                   en: 'Day 1 — register, set up the app, confirm pairs, and test-record 2 topics.' },
  'm2-day2':     { th: 'วันที่ 2 — แก้ปัญหาและอัดเพิ่มอีก 2–3 หัวข้อ',
                   en: 'Day 2 — troubleshoot and record 2–3 more topics.' },
  'm2-day3':     { th: 'วันที่ 3 — อัดหัวข้อที่เหลือให้ครบ (7/7) อัปโหลด และตรวจการส่ง',
                   en: 'Day 3 — finish the remaining topics (7/7), upload, and check submissions.' },

  'm3-pilot':    { th: 'ทดลองซ้ำในช่องทางที่สอง (มหาวิทยาลัย) อย่างน้อย 25 คู่ เพื่อเทียบต้นทุนและคุณภาพ',
                   en: 'Repeat the pilot on a second channel (universities), ≥25 pairs, to compare cost and quality.' },

  'm4-target':   { th: 'เป้าหมายสภาวะคงที่: ส่งคู่ที่ผ่าน QC ประมาณ 25 คู่ทุกสัปดาห์',
                   en: 'The steady-state goal: about 25 QC-passed pairs delivered every week.' },
  'm4-mon':      { th: 'จันทร์ — วางแผนสัปดาห์: ทบทวนเป้า ไปป์ไลน์ ช่องว่างเพศ และตารางกลุ่ม',
                   en: 'Monday — plan the week: review targets, pipeline, gender gap, and the cohort schedule.' },
  'm4-tuewed':   { th: 'อังคาร–พุธ — หาผู้เข้าร่วม งานองค์กร และซัพพอร์ตการอัด',
                   en: 'Tue–Wed — acquisition, institutional activities, and recording support.' },
  'm4-thu':      { th: 'พฤหัส — เร่งปิดงาน ตามผู้เข้าร่วม และช่วยอัดใหม่',
                   en: 'Thursday — push completions, recover participants, and support re-recording.' },
  'm4-fri':      { th: 'ศุกร์ — ทบทวน QC/การส่ง วิเคราะห์สาเหตุประจำสัปดาห์ และเตรียมไปป์ไลน์สัปดาห์หน้า',
                   en: 'Friday — QC/delivery review, weekly root-cause analysis, and next-week pipeline prep.' },

  'm5-review':   { th: 'เมื่อครบ ~100 คู่ วัดทุกช่องทางจาก leads คอนเวอร์ชัน QC เพศ และแรงที่ใช้',
                   en: 'After ~100 pairs, measure every source on leads, conversion, QC, gender, and effort.' },
  'm5-decision': { th: 'ตัดสินใจต่อช่องทาง: ขยาย / คงไว้ / ปรับปรุง / ลด-หยุด — ใช้เป็นฐานของเดือนที่ 1',
                   en: 'Decide per channel: scale / maintain / improve / reduce-stop — this sets the Month 1 baseline.' },

  'm6-m2':       { th: 'เดือน 2 — สะสมให้ถึง 200 คู่ โดยขยายองค์กรและช่องทางที่ดีที่สุด',
                   en: 'Month 2 — reach 200 cumulative pairs by scaling the best institutions and channels.' },
  'm6-m3':       { th: 'เดือน 3 — ให้ถึง 300 คู่ โดยขยายความครอบคลุมและปรับกำลังคน',
                   en: 'Month 3 — reach 300 pairs by widening coverage and optimizing staffing.' },
  'm6-m4':       { th: 'เดือน 4 — ให้ถึง 400 คู่ ใช้เฉพาะช่องทางท็อป พร้อมคุมเพศและ QC',
                   en: 'Month 4 — reach 400 pairs using only top channels, with gender and QC control.' },

  'm7-green':    { th: 'เขียว — คาดการณ์ ≥25 คู่: ทำตามปกติและเตรียมสัปดาห์หน้า',
                   en: 'Green — forecast ≥25 pairs: business as usual, prep next week.' },
  'm7-amber':    { th: 'เหลือง — คาดการณ์ 20–24 คู่: เพิ่มการบอกต่อและดึงผู้เข้าร่วมมาก่อน',
                   en: 'Amber — forecast 20–24 pairs: boost referrals and pull participants forward.' },
  'm7-red':      { th: 'แดง — คาดการณ์ 15–19 คู่: แผนกู้โดย PM+TA เพิ่มองค์กร และเปิดคลินิกกระตุ้น',
                   en: 'Red — forecast 15–19 pairs: PM+TA recovery plan, extra institutions, activation clinic.' },
  'm7-critical': { th: 'วิกฤต — คาดการณ์ <15 คู่: ระดมกู้ทุกทาง เปิดช่องสำรอง ยกระดับความเสี่ยง และทำ RCA ทันที',
                   en: 'Critical — forecast <15 pairs: all-hands recovery, backup channels, escalate risk, immediate RCA.' },

  'm8-final':          { th: 'เดือนสุดท้าย — ปิดช่องว่างให้ครบ 500 คู่ที่ผ่าน QC และเก็บงานค้างทั้งหมด',
                         en: 'Final month — close the gap to 500 QC-passed pairs and finish all outstanding work.' },
  'm9-confirm':        { th: 'ตรวจว่าส่งครบ 500 คู่: อัตราส่วนเพศ ครบทุกหัวข้อ และไม่มีเคส QC ค้าง',
                         en: 'Verify the 500-pair delivery is complete: gender ratio, all topics, no open QC cases.' },
  'm10-obligations':   { th: 'จ่ายให้ครบ — ผู้เข้าร่วม ค่าแนะนำ และเคลียร์ข้อโต้แย้งที่ค้างอยู่',
                         en: 'Complete all payments — participants, referrals, and resolve any disputes.' },
  'm10-reconcile':     { th: 'กระทบยอดแต่ละราย: ผู้เข้าร่วม → คู่ → สถานะ QC → ที่ต้องจ่าย → ยืนยันจ่ายแล้ว',
                         en: 'Reconcile each record: participant → pair → QC status → payable → payment confirmed.' },
  'm11-review':        { th: 'ทบทวนโครงการครั้งสุดท้าย — ผลลัพธ์ ประสิทธิภาพช่องทาง RCA และบทเรียนที่ได้',
                         en: 'Final project review — outcomes, channel performance, RCA, and lessons learned.' },
  'm11-relationships': { th: 'ปิดความสัมพันธ์กับองค์กรและเก็บผู้ติดต่อไว้สำหรับโครงการในอนาคต',
                         en: 'Close institutional relationships and keep contacts for future projects.' },
  'm11-deliverables':  { th: 'ส่งมอบผลงานและรายงานสุดท้ายทั้งหมด',
                         en: 'Hand over all final deliverables and reports.' },
};
