import {
  onSnapshot,
  query,
  where,
  type CollectionReference,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';

/** Attach the document id to raw snapshot data. */
export function withId<T>(id: string, data: DocumentData): T {
  return { id, ...(data as object) } as T;
}

/** Only-published constraint reused by every public collection service. */
export const PUBLISHED: QueryConstraint = where('published', '==', true);

export type Unsubscribe = () => void;
export type Sink<T> = (items: T[]) => void;
export type ErrorSink = (error: Error) => void;

/**
 * Subscribe to a collection in real time and stream mapped, typed documents.
 * Ordering is left to the caller (done client-side) so no composite index is
 * required for the single equality filter.
 */
export function subscribeCollection<T>(
  col: CollectionReference,
  constraints: QueryConstraint[],
  onData: Sink<T>,
  onError?: ErrorSink,
): Unsubscribe {
  return onSnapshot(
    query(col, ...constraints),
    (snap) => onData(snap.docs.map((d) => withId<T>(d.id, d.data()))),
    (err) => onError?.(err),
  );
}
