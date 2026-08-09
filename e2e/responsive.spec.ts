import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: '375 (iPhone SE)', width: 375, height: 667 },
  { name: '390 (iPhone 12/13)', width: 390, height: 844 },
  { name: '768 (tablet)', width: 768, height: 1024 },
  { name: '1024 (small laptop)', width: 1024, height: 768 },
  { name: '1440 (desktop)', width: 1440, height: 900 },
];

test.describe('Responsive layout — no horizontal overflow', () => {
  for (const vp of VIEWPORTS) {
    test(`homepage has no horizontal scroll at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      // Allow a 1px rounding tolerance.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `overflow at ${vp.width}px`).toBeLessThanOrEqual(1);
    });
  }

  test('mobile menu opens and closes at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    const menuCta = page.locator('header').getByRole('link', { name: /get in touch/i });
    await expect(menuCta).toBeVisible();
    await page.getByRole('button', { name: /close menu/i }).click();
    await expect(menuCta).toBeHidden();
  });

  test('agenda is readable on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/#agenda');
    await expect(page.locator('#agenda').getByText(/opening keynote/i)).toBeVisible();
  });
});
