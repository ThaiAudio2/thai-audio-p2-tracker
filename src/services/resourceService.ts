import { resourcesCol } from '@/lib/paths';
import type { Resource } from '@/lib/types';
import { PUBLISHED, subscribeCollection, type ErrorSink, type Sink, type Unsubscribe } from './shared';

/** Resource service — real-time published resources for the active event. */
export const resourceService = {
  subscribe(onData: Sink<Resource>, onError?: ErrorSink): Unsubscribe {
    return subscribeCollection<Resource>(resourcesCol(), [PUBLISHED], onData, onError);
  },
};
