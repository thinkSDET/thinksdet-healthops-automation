// Runtime settings that control how tests execute in local runs and CI/CD pipelines.
// These values are read from environment variables so the same suite can be reused across environments.
const isCI = !!process.env.CI;

export const runtime = {

    // ENV decides which URL from the environment map is used as baseURL.
    env: process.env.ENV || "qa",

    // BROWSER can be a single browser or a comma-separated list like "chromium,firefox".
    // CI defaults to "all" so the full browser matrix runs automatically in pipeline execution.
    browser: process.env.BROWSER || (isCI ? "all" : "chromium"),

    // workers controls test parallelism. CI usually runs with fewer workers to avoid resource strain.
    workers: Number(process.env.WORKERS ?? (isCI ? 2 : 1)),

    // Local runs should stay visible in the browser by default.
    // CI still prefers headless execution for speed and stability.
    headless: process.env.HEADLESS !== undefined ? process.env.HEADLESS === "true" : isCI

};