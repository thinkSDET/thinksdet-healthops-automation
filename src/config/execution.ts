// Runtime settings that control how tests execute in local runs and CI/CD pipelines.
// These values are read from environment variables so the same suite can be reused across environments.
export const runtime = {

    // ENV decides which URL from the environment map is used as baseURL.
    env: process.env.ENV || "qa",

    // BROWSER can be a single browser or a comma-separated list like "chromium,firefox".
    // CI defaults to "all" so the full browser matrix runs automatically in pipeline execution.
    browser: process.env.BROWSER || (process.env.CI ? "all" : "chromium"),

    // workers controls test parallelism. CI usually runs with fewer workers to avoid resource strain.
    workers: Number(process.env.WORKERS ?? (process.env.CI ? 2 : 3)),

    // Headless defaults to true for CI and local automation stability.
    // If HEADLESS is explicitly set, that value wins.
    headless: process.env.HEADLESS === undefined ? true : process.env.HEADLESS === "true"

};