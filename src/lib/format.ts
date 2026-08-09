import type { TS } from './types';

/** Format an ISO date range like "May 14–16, 2026" (or a single date). */
export function formatDateRange(startISO?: string, endISO?: string): string {
  if (!startISO) return '';
  const start = new Date(`${startISO}T00:00:00`);
  if (Number.isNaN(start.getTime())) return startISO;
  const startMonth = start.toLocaleDateString('en-US', { month: 'long' });
  const startDay = start.getDate();
  const year = start.getFullYear();

  if (!endISO || endISO === startISO) {
    return `${startMonth} ${startDay}, ${year}`;
  }
  const end = new Date(`${endISO}T00:00:00`);
  if (Number.isNaN(end.getTime())) return `${startMonth} ${startDay}, ${year}`;
  const endMonth = end.toLocaleDateString('en-US', { month: 'long' });
  const endDay = end.getDate();
  if (start.getMonth() === end.getMonth() && year === end.getFullYear()) {
    return `${startMonth} ${startDay}–${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
}

/** Weekday + date for a given day index of the event, e.g. "Thursday, May 14". */
export function dayLabel(startISO: string, dayIndex: number): string {
  if (!startISO) return `Day ${dayIndex}`;
  const d = new Date(`${startISO}T00:00:00`);
  if (Number.isNaN(d.getTime())) return `Day ${dayIndex}`;
  d.setDate(d.getDate() + (dayIndex - 1));
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

/** Convert a 24h "HH:mm" string to "9:00 AM". */
export function formatTime(hhmm?: string): string {
  if (!hhmm) return '';
  const [hStr, mStr] = hhmm.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Human relative/absolute time from a Firestore timestamp. */
export function formatTimestamp(ts: TS): string {
  if (!ts) return '—';
  const date = ts.toDate();
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function timeAgo(ts: TS): string {
  if (!ts) return '';
  const seconds = Math.floor((Date.now() - ts.toDate().getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatTimestamp(ts);
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
}
