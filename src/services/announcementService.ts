import { announcementsCol } from '@/lib/paths';
import type { Announcement } from '@/lib/types';
import { PUBLISHED, subscribeCollection, type ErrorSink, type Sink, type Unsubscribe } from './shared';

/** Announcement service — real-time published announcements for the active event. */
export const announcementService = {
  subscribe(onData: Sink<Announcement>, onError?: ErrorSink): Unsubscribe {
    return subscribeCollection<Announcement>(announcementsCol(), [PUBLISHED], onData, onError);
  },
};
