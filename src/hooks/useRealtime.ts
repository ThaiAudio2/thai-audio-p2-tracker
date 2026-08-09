import { useEffect, useMemo, useState } from 'react';
import { isFirebaseConfigured } from '@/lib/firebase';
import type { ErrorSink } from '@/services/shared';

type Source = 'live' | 'fallback';

export interface RealtimeState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  /** Whether the data came from Firestore ("live") or local seed data ("fallback"). */
  source: Source;
  empty: boolean;
}

type Subscriber<T> = (onData: (items: T[]) => void, onError?: ErrorSink) => () => void;

/**
 * Subscribe to a collection service in real time, with graceful fallback:
 *  - Firebase not configured  → render `fallback` immediately (source: fallback)
 *  - Firestore returns rows    → render live data (source: live)
 *  - Firestore returns nothing → render `fallback` so the section is never blank
 *  - Firestore errors          → render `fallback` and expose the error
 */
export function useRealtimeCollection<T>(
  subscribe: Subscriber<T>,
  fallback: T[],
): RealtimeState<T> {
  const [data, setData] = useState<T[]>(isFirebaseConfigured ? [] : fallback);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source>(isFirebaseConfigured ? 'live' : 'fallback');

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    setLoading(true);
    // Safety net: if no snapshot arrives quickly, show seed data instead of
    // hanging on skeletons. A later live snapshot still replaces it.
    const timeout = window.setTimeout(() => {
      setLoading((wasLoading) => {
        if (wasLoading) {
          setData(fallback);
          setSource('fallback');
        }
        return false;
      });
    }, 3000);
    const unsub = subscribe(
      (items) => {
        window.clearTimeout(timeout);
        if (items.length > 0) {
          setData(items);
          setSource('live');
        } else {
          setData(fallback);
          setSource('fallback');
        }
        setError(null);
        setLoading(false);
      },
      (err) => {
        window.clearTimeout(timeout);
        setData(fallback);
        setSource('fallback');
        setError(err.message);
        setLoading(false);
      },
    );
    return () => {
      window.clearTimeout(timeout);
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({ data, loading, error, source, empty: !loading && data.length === 0 }),
    [data, loading, error, source],
  );
}
