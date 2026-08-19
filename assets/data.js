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
