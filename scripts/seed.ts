/**
 * Seed Firestore with the initial HOBI Partner Seminar 2026 content.
 *
 * The public site never writes to Firestore (writes are locked down by Security
 * Rules), so seeding runs server-side with the Firebase Admin SDK, which bypasses
 * rules. Provide a service-account key via GOOGLE_APPLICATION_CREDENTIALS.
 *
 * Usage:
 *   1. Download a service account key:
 *        Firebase console → Project settings → Service accounts → Generate new private key
 *   2. Point to it and run:
 *        export GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
 *        npm run seed
 *      (or put FIREBASE_PROJECT_ID + GOOGLE_APPLICATION_CREDENTIALS in .env)
 *
 * Content comes from src/data/seed.ts — the single source of truth also used for
 * the site's fallback rendering.
 */
import { existsSync } from 'node:fs';
import { cert, initializeApp, applicationDefault } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import {
  seedAgenda,
  seedAnnouncements,
  seedEvent,
  seedFaqs,
  seedResources,
  seedSpeakers,
} from '../src/data/seed';

if (existsSync('.env')) process.loadEnvFile('.env');

const EVENT_ID = process.env.VITE_EVENT_ID || seedEvent.id;
const projectId = process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

function fail(message: string): never {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

/** Remove client-only fields (id + null audit timestamps) before writing. */
function clean<T extends { id: string }>(row: T) {
  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = row as T & {
    createdAt?: unknown;
    updatedAt?: unknown;
  };
  return rest;
}

async function main() {
  if (!keyPath && !process.env.FIREBASE_CONFIG) {
    fail(
      'No credentials found. Set GOOGLE_APPLICATION_CREDENTIALS to your service-account key path.',
    );
  }
  if (keyPath && !existsSync(keyPath)) {
    fail(`Service-account key not found at GOOGLE_APPLICATION_CREDENTIALS=${keyPath}`);
  }

  initializeApp(
    keyPath
      ? { credential: cert(keyPath), projectId }
      : { credential: applicationDefault(), projectId },
  );
  const db = getFirestore();
  const now = FieldValue.serverTimestamp();
  const eventRef = db.collection('events').doc(EVENT_ID);

  console.log(`→ Seeding events/${EVENT_ID} …`);
  await eventRef.set({ ...clean(seedEvent), createdAt: now, updatedAt: now }, { merge: true });
  console.log('✓ Event settings written.');

  const collections: Array<[string, Array<{ id: string }>]> = [
    ['speakers', seedSpeakers],
    ['agenda', seedAgenda],
    ['announcements', seedAnnouncements],
    ['faqs', seedFaqs],
    ['resources', seedResources],
  ];

  for (const [name, rows] of collections) {
    console.log(`→ Seeding ${name} (${rows.length}) …`);
    const batch = db.batch();
    for (const row of rows) {
      batch.set(
        eventRef.collection(name).doc(row.id),
        { ...clean(row), createdAt: now, updatedAt: now },
        { merge: true },
      );
    }
    await batch.commit();
    console.log(`✓ ${name} seeded.`);
  }

  console.log('\n✓ Seed complete. Your event is live in Firestore.\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n✖ Seed failed:', err instanceof Error ? err.message : err, '\n');
  process.exit(1);
});
