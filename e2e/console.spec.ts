import { test, expect } from '@playwright/test';

/**
 * Guards against unexpected runtime/console errors. Firebase and network errors
 * are expected in the QA build (dummy, non-functional Firebase config), so they
 * are allow-listed. Anything else — React errors, undefined access, etc. — fails.
 */
const ALLOWED = [
  /firebase/i,
  /firestore/i,
  /firebaseapp\.com/i,
  /googleapis\.com/i,
  /net::/i,
  /Failed to load resource/i,
  /api-key-not-valid/i,
  /permission-insufficient|permission-denied/i,
  /400 \(Bad Request\)|403 \(Forbidden\)/i,
  /ERR_/i,
  /installations/i,
];

function isAllowed(text: string): boolean {
  return ALLOWED.some((re) => re.test(text));
}

test('homepage has no unexpected console errors', async ({ page }) => {
  const unexpected: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !isAllowed(msg.text())) unexpected.push(msg.text());
  });
  page.on('pageerror', (err) => {
    if (!isAllowed(err.message)) unexpected.push(err.message);
  });

  await page.goto('/');
  await page.waitForTimeout(1500);

  expect(unexpected, `Unexpected console errors:\n${unexpected.join('\n')}`).toEqual([]);
});
