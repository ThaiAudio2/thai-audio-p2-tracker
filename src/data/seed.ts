import type {
  AgendaItem,
  Announcement,
  EventSettings,
  Faq,
  Resource,
  Speaker,
} from '@/lib/types';

/**
 * Seed / fallback content for the HOBI Partner Seminar 2026.
 *
 * This is the single source of truth for initial seminar data. It powers two things:
 *   1. Fallback rendering — when Firestore is unconfigured or empty, the site
 *      renders this content so it never looks broken during development.
 *   2. Seeding — `scripts/seed.ts` migrates this data into Firestore.
 *
 * Timestamps are `null` here; Firestore populates real `createdAt`/`updatedAt`
 * server timestamps when seeded. Fallback content is NOT the production database.
 */

export const seedEvent: EventSettings = {
  id: 'hobi-partner-seminar-2026',
  name: 'HOBI Partner Seminar 2026',
  tagline: 'A premium gathering of partners, operators, and technologists shaping what comes next.',
  heroHeadline: 'Partnership, engineered for what comes next.',
  heroSubcopy:
    'One day. Every partner in the room. A working agenda for the year ahead — keynotes, deep-dive sessions, and the connections that move the roadmap forward.',
  status: 'published',
  startDate: '2026-05-14',
  endDate: '2026-05-14',
  timezone: 'Asia/Bangkok (GMT+7)',
  venueName: 'The Athenee Hotel, Grand Ballroom',
  venueAddress: '61 Wireless Road, Lumphini, Pathum Wan',
  city: 'Bangkok',
  country: 'Thailand',
  contactEmail: 'partners@hobi-seminar.com',
  registrationTime: '08:00 – 09:00',
  dressCode: 'Business casual',
  parking: 'Complimentary valet parking on Wireless Road',
  introTitle: 'A focused day for the people who build together',
  introBody:
    'The HOBI Partner Seminar brings the entire partner network into one room for a single, high-signal day. It is designed to align on strategy, share what is genuinely working, and turn relationships into roadmap. No fluff, no filler — every session earns its place.',
  objectives: [
    'Align the partner network on the 2026 product and go-to-market roadmap',
    'Share proven playbooks for regional growth and joint delivery',
    'Create the introductions that turn partnership into pipeline',
  ],
  highlights: [
    { id: 'h1', icon: 'Users', label: 'Partners attending', value: '300+', description: 'Senior operators from across the HOBI network.' },
    { id: 'h2', icon: 'Mic', label: 'Keynotes & sessions', value: '12', description: 'Across keynotes, panels, and deep dives.' },
    { id: 'h3', icon: 'Handshake', label: 'Curated introductions', value: '1:1', description: 'Matched meetings booked on-site.' },
    { id: 'h4', icon: 'Trophy', label: 'Partner awards', value: 'Live', description: 'Recognising the year’s standout partners.' },
  ],
  importantInfo: [
    { id: 'i1', icon: 'MapPin', title: 'Getting there', body: 'The Athenee Hotel is a 4-minute walk from Ploenchit BTS (exit 4). Valet parking is available on Wireless Road.' },
    { id: 'i2', icon: 'BadgeCheck', title: 'Check-in & badges', body: 'Registration opens at 08:00. Bring photo ID; your access QR code is emailed the week before.' },
    { id: 'i3', icon: 'Wifi', title: 'On-site connectivity', body: 'Complimentary high-speed Wi-Fi throughout the venue. Network details are printed on your badge.' },
    { id: 'i4', icon: 'Coffee', title: 'Meals & refreshments', body: 'Breakfast, a seated lunch, and all-day refreshments are provided. Dietary needs are handled at check-in.' },
  ],
  createdAt: null,
  updatedAt: null,
};

export const seedSpeakers: Speaker[] = [
  { id: 'spk-amara', name: 'Amara Chen', title: 'Chief Product Officer', company: 'HOBI', bio: 'Amara leads product strategy across the HOBI platform, with two decades spanning enterprise SaaS and marketplace businesses.', photoUrl: '', linkedin: '', session: 'Opening keynote: The year ahead', order: 10, featured: true, published: true, createdAt: null, updatedAt: null },
  { id: 'spk-daniel', name: 'Daniel Okafor', title: 'VP, Partnerships', company: 'HOBI', bio: 'Daniel runs the global partner program and has built partner ecosystems at three high-growth technology companies.', photoUrl: '', linkedin: '', session: 'Building the partner ecosystem', order: 20, featured: true, published: true, createdAt: null, updatedAt: null },
  { id: 'spk-mei', name: 'Mei Tanaka', title: 'Head of Platform Engineering', company: 'HOBI', bio: 'Mei oversees the infrastructure powering HOBI’s real-time products, focused on reliability at scale.', photoUrl: '', linkedin: '', session: 'Real-time products in practice', order: 30, featured: false, published: true, createdAt: null, updatedAt: null },
  { id: 'spk-sofia', name: 'Sofia Alvarez', title: 'Founder & CEO', company: 'Northwind Partners', bio: 'Sofia is a long-standing HOBI partner and a leading voice on go-to-market strategy for regional expansion.', photoUrl: '', linkedin: '', session: 'Scaling go-to-market together', order: 40, featured: false, published: true, createdAt: null, updatedAt: null },
];

export const seedAgenda: AgendaItem[] = [
  { id: 'ag-01', day: 1, startTime: '08:00', endTime: '09:00', title: 'Registration & networking breakfast', description: 'Collect your badge and connect over coffee before the day begins.', track: 'Networking', location: 'Foyer', speaker: '', status: 'scheduled', order: 10, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-02', day: 1, startTime: '09:00', endTime: '09:45', title: 'Opening keynote: The year ahead', description: 'The vision, the roadmap, and what partnership looks like in 2026.', track: 'Keynote', location: 'Grand Ballroom', speaker: 'Amara Chen', status: 'scheduled', order: 20, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-03', day: 1, startTime: '10:00', endTime: '10:45', title: 'Building the partner ecosystem', description: 'How the partner program is evolving and where the biggest opportunities are.', track: 'Session', location: 'Grand Ballroom', speaker: 'Daniel Okafor', status: 'scheduled', order: 30, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-04', day: 1, startTime: '11:00', endTime: '12:15', title: 'Deep dive: Real-time products in practice', description: 'A hands-on look at building on the HOBI platform.', track: 'Workshop', location: 'Salon A', speaker: 'Mei Tanaka', status: 'scheduled', order: 40, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-05', day: 1, startTime: '12:15', endTime: '13:30', title: 'Lunch', description: 'Seated lunch with curated table topics.', track: 'Break', location: 'Terrace', speaker: '', status: 'scheduled', order: 50, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-06', day: 1, startTime: '13:30', endTime: '14:15', title: 'Panel: Scaling go-to-market together', description: 'Partners share what’s working in regional expansion.', track: 'Panel', location: 'Grand Ballroom', speaker: 'Sofia Alvarez, Daniel Okafor', status: 'scheduled', order: 60, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-07', day: 1, startTime: '14:30', endTime: '15:15', title: 'Partner awards & recognition', description: 'Celebrating the standout partners of the year.', track: 'Session', location: 'Grand Ballroom', speaker: '', status: 'scheduled', order: 70, published: true, createdAt: null, updatedAt: null },
  { id: 'ag-08', day: 1, startTime: '15:30', endTime: '17:00', title: 'Closing reception', description: 'Drinks, canapés, and 1:1 introductions to close the day.', track: 'Networking', location: 'Rooftop', speaker: '', status: 'scheduled', order: 80, published: true, createdAt: null, updatedAt: null },
];

export const seedAnnouncements: Announcement[] = [
  { id: 'an-01', title: 'Save the date — 14 May 2026', body: 'The HOBI Partner Seminar returns to The Athenee Hotel, Bangkok. Invitations are going out to the partner network now.', level: 'success', pinned: true, published: true, publishAt: '', createdAt: null, updatedAt: null },
  { id: 'an-02', title: 'Agenda published', body: 'The full running order is live below. Deep-dive capacity is limited, so plan your preferred sessions.', level: 'info', pinned: false, published: true, publishAt: '', createdAt: null, updatedAt: null },
];

export const seedFaqs: Faq[] = [
  { id: 'faq-01', question: 'Who can attend the seminar?', answer: 'The seminar is exclusively for HOBI partners and invited guests. Each partner organization may bring multiple attendees.', category: 'General', order: 10, published: true, createdAt: null, updatedAt: null },
  { id: 'faq-02', question: 'Is there a fee to attend?', answer: 'No. Attendance is complimentary for partners, though places are limited and by invitation.', category: 'General', order: 20, published: true, createdAt: null, updatedAt: null },
  { id: 'faq-03', question: 'Will sessions be recorded?', answer: 'Keynotes and panels will be recorded and shared with attendees afterward in the Resources section.', category: 'Sessions', order: 30, published: true, createdAt: null, updatedAt: null },
  { id: 'faq-04', question: 'What is the dress code?', answer: 'Business casual. The day mixes keynotes, deep dives, and networking — comfortable and professional is ideal.', category: 'Logistics', order: 40, published: true, createdAt: null, updatedAt: null },
  { id: 'faq-05', question: 'How do I get to the venue?', answer: 'The Athenee Hotel is a short walk from Ploenchit BTS (exit 4). Complimentary valet parking is available on Wireless Road.', category: 'Logistics', order: 50, published: true, createdAt: null, updatedAt: null },
];

export const seedResources: Resource[] = [
  { id: 'res-01', title: 'Attendee welcome pack', description: 'Venue map, agenda, and travel tips in one PDF.', type: 'pdf', url: 'https://example.com/hobi-welcome-pack.pdf', order: 10, published: true, createdAt: null, updatedAt: null },
  { id: 'res-02', title: 'Partner program overview', description: 'A primer on the 2026 partner program and tiers.', type: 'link', url: 'https://example.com/partner-program', order: 20, published: true, createdAt: null, updatedAt: null },
  { id: 'res-03', title: 'Partner brand & guidelines', description: 'Logos, usage guidance, and co-marketing templates.', type: 'file', url: 'https://example.com/partner-brand-kit.zip', order: 30, published: true, createdAt: null, updatedAt: null },
];
