import type { Timestamp } from 'firebase/firestore';

/** Firestore server timestamps come back as `Timestamp`; on write we send them via serverTimestamp(). */
export type TS = Timestamp | null;

export interface Auditable {
  createdAt: TS;
  updatedAt: TS;
}

/** The public-facing event configuration (single active event drives the site). */
export interface EventSettings extends Auditable {
  id: string;
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubcopy: string;
  status: 'draft' | 'published';
  startDate: string; // ISO date, e.g. "2026-05-14"
  endDate: string; // ISO date
  timezone: string; // e.g. "Asia/Bangkok"
  venueName: string;
  venueAddress: string;
  city: string;
  country: string;
  contactEmail: string;
  registrationTime: string; // e.g. "08:00 – 09:00"
  dressCode: string;
  parking: string;
  introTitle: string;
  introBody: string;
  objectives: string[];
  highlights: EventHighlight[];
  importantInfo: InfoItem[];
}

export interface EventHighlight {
  id: string;
  icon: string; // Lucide icon name
  label: string;
  value: string;
  description: string;
}

export interface InfoItem {
  id: string;
  icon: string;
  title: string;
  body: string;
}

export interface AgendaItem extends Auditable {
  id: string;
  day: number; // 1-based day index
  startTime: string; // "09:00"
  endTime: string; // "09:45"
  title: string;
  description: string;
  track: string; // e.g. "Keynote", "Workshop", "Panel"
  location: string;
  speaker: string; // display name(s)
  status: 'scheduled' | 'live' | 'completed';
  order: number;
  published: boolean;
}

export interface Speaker extends Auditable {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  photoUrl: string;
  linkedin: string;
  session: string; // the session this speaker leads
  order: number;
  featured: boolean;
  published: boolean;
}

export interface Announcement extends Auditable {
  id: string;
  title: string;
  body: string;
  level: 'info' | 'success' | 'warning' | 'critical';
  pinned: boolean;
  published: boolean;
  publishAt: string; // ISO datetime
}

export interface Faq extends Auditable {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export interface Resource extends Auditable {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'link' | 'slide' | 'video' | 'file';
  url: string;
  order: number;
  published: boolean;
}

/** Shape used by services/seed — audit fields are managed by the data layer. */
export type Writable<T extends Auditable> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
