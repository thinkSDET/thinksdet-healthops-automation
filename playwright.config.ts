import { defineConfig } from '@playwright/test';
import { environment } from "./src/config/environment";
import { browserProjects } from "./src/config/browsers";
import { runtime } from "./src/config/execution";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// Parse the browser value from runtime so a single browser or a browser set can be executed.
// Example: BROWSER=chromium,firefox or BROWSER=all.
const requestedBrowsers = (runtime.browser || (process.env.CI ? 'all' : 'chromium'))
  .split(',')
  .map((browser) => browser.trim().toLowerCase())
  .filter(Boolean);

// Build the final Playwright project list.
// If "all" is requested, run every browser defined in browserProjects.
// Otherwise, map only the requested browser names to their project configs.
const selectedProjects = requestedBrowsers.includes('all')
  ? Object.values(browserProjects)
  : requestedBrowsers
      .map((browser) => browserProjects[browser as keyof typeof browserProjects])
      .filter((project): project is (typeof browserProjects)[keyof typeof browserProjects] => !!project);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // Run test files in parallel to reduce total execution time.
  fullyParallel: true,
  // Stop execution in CI if someone accidentally leaves test.only in the suite.
  forbidOnly: !!process.env.CI,
  // Retry failed tests only in CI to make pipelines more stable.
  retries: process.env.CI ? 2 : 0,
  // Use runtime-defined worker count so local and CI parallelism can be tuned separately.
  workers: runtime.workers,
  // Default Allure reporter is enough for local debugging and basic test result review.
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  // Shared settings used by all selected projects.
  use: {
    // baseURL is chosen from the current environment (qa/stage/preprod).
    baseURL: environment[runtime.env as keyof typeof environment],
    // Headless mode is controlled centrally from runtime settings.
    headless: runtime.headless,
    // Capture screenshots, videos, and traces only when failure occurs to save time and disk.
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure"
  },

  // Select the browser projects dynamically.
  // If a browser list is invalid or empty, fall back to all defined browser projects.
  projects: selectedProjects.length > 0 ? selectedProjects : Object.values(browserProjects),

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
