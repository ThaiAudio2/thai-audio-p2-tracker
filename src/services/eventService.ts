import { onSnapshot } from 'firebase/firestore';
import { eventDoc } from '@/lib/paths';
import type { EventSettings } from '@/lib/types';
import { withId, type ErrorSink, type Unsubscribe } from './shared';

/**
 * Event service — reads the single active event document (`events/{eventId}`).
 * All Firebase access for the event lives here so UI components stay declarative.
 */
export const eventService = {
  /** Real-time subscription to the active event. Emits `null` when it doesn't exist. */
  subscribe(
    onData: (event: EventSettings | null) => void,
    onError?: ErrorSink,
  ): Unsubscribe {
    return onSnapshot(
      eventDoc(),
      (snap) => onData(snap.exists() ? withId<EventSettings>(snap.id, snap.data()) : null),
      (err) => onError?.(err),
    );
  },
};
