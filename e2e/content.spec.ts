import { test, expect } from '@playwright/test';

/**
 * The QA build uses a non-functional dummy Firebase config, so the app falls
 * back to local seed data. These tests verify that every data-driven section
 * renders real content (never a blank/broken section) via that fallback path —
 * the same code path that renders live Firestore data in production.
 */
test.describe('Data sections render (seed fallback)', () => {
  test('agenda shows sessions with times and speakers', async ({ page }) => {
    await page.goto('/#agenda');
    const agenda = page.locator('#agenda');
    await expect(agenda.getByText(/opening keynote/i)).toBeVisible();
    await expect(agenda.getByText(/closing reception/i)).toBeVisible();
    await expect(agenda.getByText(/Amara Chen/i).first()).toBeVisible();
  });

  test('speakers render and open a detail modal', async ({ page }) => {
    await page.goto('/#speakers');
    const speakers = page.locator('#speakers');
    await expect(speakers.getByText('Amara Chen').first()).toBeVisible();
    await speakers.getByRole('button', { name: /view amara chen/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByText(/product strategy/i)).toBeVisible();
  });

  test('FAQ accordion expands an answer', async ({ page }) => {
    await page.goto('/#faq');
    const faq = page.locator('#faq');
    const question = faq.getByRole('button', { name: /who can attend/i });
    await expect(question).toBeVisible();
    await question.click();
    await expect(faq.getByText(/exclusively for HOBI partners/i)).toBeVisible();
  });

  test('announcements and resources render content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#announcements').getByText(/save the date/i)).toBeVisible();
    await expect(page.locator('#resources').getByText(/welcome pack/i)).toBeVisible();
  });
});
