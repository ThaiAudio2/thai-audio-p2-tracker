import { faqsCol } from '@/lib/paths';
import type { Faq } from '@/lib/types';
import { PUBLISHED, subscribeCollection, type ErrorSink, type Sink, type Unsubscribe } from './shared';

/** FAQ service — real-time published FAQ entries for the active event. */
export const faqService = {
  subscribe(onData: Sink<Faq>, onError?: ErrorSink): Unsubscribe {
    return subscribeCollection<Faq>(faqsCol(), [PUBLISHED], onData, onError);
  },
};
