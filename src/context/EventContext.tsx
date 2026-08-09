import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { eventService } from '@/services/eventService';
import { isFirebaseConfigured } from '@/lib/firebase';
import { seedEvent } from '@/data/seed';
import type { EventSettings } from '@/lib/types';

interface EventState {
  /** Always populated — falls back to seed data when Firestore is empty/unavailable. */
  event: EventSettings;
  loading: boolean;
  error: string | null;
  source: 'live' | 'fallback';
}

const EventContext = createContext<EventState | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<EventSettings>(seedEvent);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'live' | 'fallback'>(
    isFirebaseConfigured ? 'live' : 'fallback',
  );

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsub = eventService.subscribe(
      (e) => {
        if (e) {
          setEvent(e);
          setSource('live');
        } else {
          setEvent(seedEvent);
          setSource('fallback');
        }
        setError(null);
        setLoading(false);
      },
      (err) => {
        setEvent(seedEvent);
        setSource('fallback');
        setError(err.message);
        setLoading(false);
      },
    );
    // Safety net: never hang on skeletons if the backend is slow/unreachable.
    const timeout = window.setTimeout(() => setLoading(false), 3000);
    return () => {
      window.clearTimeout(timeout);
      unsub();
    };
  }, []);

  return (
    <EventContext.Provider value={{ event, loading, error, source }}>
      {children}
    </EventContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEvent(): EventState {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEvent must be used within an EventProvider');
  return ctx;
}
