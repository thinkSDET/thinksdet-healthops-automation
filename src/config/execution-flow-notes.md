# Playwright Execution Flow

This file explains how the framework decides what to run in local execution and in CI/CD pipeline execution.

## 1. Local execution flow

When a developer runs tests locally:

- `ENV` decides which environment is used.
  - Example: `ENV=qa` selects `qa` URL from `environment.ts`
- `BROWSER` decides which browser to run.
  - Example: `BROWSER=chromium`
  - Example: `BROWSER=chromium,firefox`
- `HEADLESS` decides if browser runs in the background without UI.
  - Default is `true`
- `WORKERS` decides how many tests run in parallel.
  - Default is `3` locally

Example:

- `ENV=stage`
- `BROWSER=firefox`
- `HEADLESS=true`

This will run the suite against the `stage` environment in Firefox in headless mode.

## 2. CI/CD execution flow

In a pipeline, the framework is expected to run in a more controlled and automated way:

- `CI` is detected automatically by the environment.
- `BROWSER` defaults to `all` in CI.
  - This means the full browser matrix is executed automatically.
- `WORKERS` defaults to `2` in CI.
  - This reduces system load and keeps the pipeline stable.
- `HEADLESS` remains enabled by default for faster and stable execution in server environments.

Example:

- `CI=true`
- `ENV=preprod`
- `BROWSER=all`

This will run the test suite against `preprod` in all supported desktop browsers.

## 3. How the config files work together

```mermaid
flowchart TD
    A[ENV / BROWSER / WORKERS / HEADLESS] --> B[execution.ts]
    B --> C[playwright.config.ts]
    D[environment.ts] --> C
    E[browsers.ts] --> C
    C --> F[Test suite runs]
    D --> G[baseURL selected]
    E --> H[Browser project selected]
    B --> I[Local or CI execution mode]

    I --> J{Is CI?}
    J -- Yes --> K[Use CI defaults: all browsers, 2 workers]
    J -- No --> L[Use local defaults: chromium, 3 workers]
    K --> F
    L --> F
```

1. `environment.ts`
   - Stores all environment URLs.
   - Example: `qa`, `stage`, `preprod`

2. `execution.ts`
   - Reads runtime values from environment variables.
   - Decides the active environment, browser(s), workers, and headless mode.

3. `browsers.ts`
   - Defines the browser project setup for Playwright.
   - Example: `chromium`, `firefox`, `webkit`

4. `playwright.config.ts`
   - Uses the runtime settings and browser definitions.
   - Builds the final list of projects for execution.
   - Determines the base URL for every test.

## 4. Simple summary

- Local run = developer-controlled settings
- CI run = pipeline-friendly defaults
- Browser selection = dynamic via `BROWSER`
- Environment selection = dynamic via `ENV`
- Execution scale = controlled via `WORKERS`

This design keeps the same test suite reusable across local validation and automated pipeline runs.
