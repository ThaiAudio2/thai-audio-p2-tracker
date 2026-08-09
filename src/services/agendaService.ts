import { agendaCol } from '@/lib/paths';
import type { AgendaItem } from '@/lib/types';
import { PUBLISHED, subscribeCollection, type ErrorSink, type Sink, type Unsubscribe } from './shared';

/** Agenda service — real-time published agenda items for the active event. */
export const agendaService = {
  subscribe(onData: Sink<AgendaItem>, onError?: ErrorSink): Unsubscribe {
    return subscribeCollection<AgendaItem>(agendaCol(), [PUBLISHED], onData, onError);
  },
};
