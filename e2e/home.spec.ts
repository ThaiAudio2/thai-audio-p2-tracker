import { test, expect } from '@playwright/test';

test.describe('Public homepage', () => {
  test('renders hero, navigation, key sections and footer', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/HOBI Partner Seminar 2026/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Primary CTAs (no registration — the site is read-only)
    await expect(page.getByRole('link', { name: /view the agenda/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /about the seminar/i })).toBeVisible();

    // Section anchors exist
    for (const id of ['about', 'event', 'highlights', 'agenda', 'speakers', 'faq']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    // No admin surface exists anymore
    await expect(page.getByRole('link', { name: /organizer sign in/i })).toHaveCount(0);

    await expect(page.getByText(/all rights reserved/i)).toBeVisible();
  });

  test('desktop navigation links are present', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const nav = page.locator('header nav');
    for (const label of ['About', 'Highlights', 'Agenda', 'Speakers', 'Resources', 'FAQ']) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
    await expect(nav.getByRole('link', { name: /get in touch/i })).toBeVisible();
  });

  test('anchor navigation updates the URL hash', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('header nav').getByRole('link', { name: 'Agenda', exact: true }).click();
    await expect(page).toHaveURL(/#agenda$/);
  });

  test('unknown routes redirect to a 404 page', async ({ page }) => {
    await page.goto('/does-not-exist');
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});
