import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

/**
 * In some managed environments Chromium is pre-installed at a fixed path that
 * may not match the exact build Playwright expects. When present, point
 * Playwright directly at that binary so it doesn't try to download one.
 */
const PREINSTALLED_CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const executablePath = existsSync(PREINSTALLED_CHROME) ? PREINSTALLED_CHROME : undefined;

/**
 * Playwright runs against a production preview build. The QA build uses the
 * dummy `.env` (non-functional Firebase config), so tests focus on rendering,
 * navigation, responsive layout, and client-side validation — the behavior
 * that does not require a live backend. Firebase/network console errors are
 * expected and filtered inside the console-error spec.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], launchOptions: { executablePath } },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
