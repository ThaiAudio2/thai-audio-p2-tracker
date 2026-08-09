import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

/**
 * Firebase is configured entirely from environment variables (see `.env.example`).
 * These are Firebase *Web* config values — safe to ship to the client and NOT
 * secrets. Public read access is controlled by Firestore Security Rules; the
 * site never writes to Firestore from the browser.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** True when the required web config is present. The app falls back to seed data otherwise. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

if (!isFirebaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.info(
    '[firebase] No configuration found — rendering with local seed data. ' +
      'Copy .env.example to .env and add your Firebase web config to load live data.',
  );
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

/** The single active event id. Overridable per-deployment. */
export const EVENT_ID = import.meta.env.VITE_EVENT_ID || 'hobi-partner-seminar-2026';

// Optionally route to the local Firebase Emulator Suite during development.
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  const host = import.meta.env.VITE_EMULATOR_HOST || '127.0.0.1';
  try {
    connectFirestoreEmulator(db, host, 8080);
    connectStorageEmulator(storage, host, 9199);
    // eslint-disable-next-line no-console
    console.info('[firebase] Connected to local emulators.');
  } catch {
    // Emulator connection can only be established once per session; ignore repeats.
  }
}

export { app };
