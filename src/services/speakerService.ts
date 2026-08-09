import { speakersCol } from '@/lib/paths';
import type { Speaker } from '@/lib/types';
import { PUBLISHED, subscribeCollection, type ErrorSink, type Sink, type Unsubscribe } from './shared';

/** Speaker service — real-time published speakers for the active event. */
export const speakerService = {
  subscribe(onData: Sink<Speaker>, onError?: ErrorSink): Unsubscribe {
    return subscribeCollection<Speaker>(speakersCol(), [PUBLISHED], onData, onError);
  },
};
