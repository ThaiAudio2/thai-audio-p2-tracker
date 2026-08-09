import {
  collection,
  doc,
  type CollectionReference,
  type DocumentReference,
} from 'firebase/firestore';
import { db, EVENT_ID } from './firebase';

/**
 * Centralised Firestore path builders so the schema lives in one place:
 *
 *   events/{eventId}
 *   events/{eventId}/agenda/{agendaId}
 *   events/{eventId}/speakers/{speakerId}
 *   events/{eventId}/announcements/{announcementId}
 *   events/{eventId}/faqs/{faqId}
 *   events/{eventId}/resources/{resourceId}
 */

export const eventDoc = (eventId: string = EVENT_ID): DocumentReference =>
  doc(db, 'events', eventId);

const sub = (name: string, eventId: string = EVENT_ID): CollectionReference =>
  collection(db, 'events', eventId, name);

export const agendaCol = (eventId?: string) => sub('agenda', eventId);
export const speakersCol = (eventId?: string) => sub('speakers', eventId);
export const announcementsCol = (eventId?: string) => sub('announcements', eventId);
export const faqsCol = (eventId?: string) => sub('faqs', eventId);
export const resourcesCol = (eventId?: string) => sub('resources', eventId);
