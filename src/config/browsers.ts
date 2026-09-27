import { devices } from "@playwright/test";

// Browser matrix used by Playwright projects.
// Each entry defines a named project and the desktop browser settings for that project.
export const browserProjects = {
    chromium: {
        name: "chromium",
        // Desktop Chrome profile used for local and CI execution.
        use: { ...devices["Desktop Chrome"] }
    },

    firefox: {
        name: "firefox",
        // Desktop Firefox profile used for cross-browser validation.
        use: { ...devices["Desktop Firefox"] }
    },

    webkit: {
        name: "webkit",
        // Desktop Safari/WebKit profile used to validate browser compatibility.
        use: { ...devices["Desktop Safari"] }
    }
};