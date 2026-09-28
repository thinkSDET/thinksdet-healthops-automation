/**
 * Captures visual evidence for failed Playwright tests.
 *
 * This service is used when a test fails and we want to preserve a screenshot of
 * the current page state. It creates the screenshot folder if needed, saves a
 * full-page image to disk, and attaches that image to the Playwright test report.
 * This makes debugging faster because the failure has both a test log and a
 * visual artifact attached to it.
 */
import path from "path";
import fs from "fs";
import { Page, TestInfo } from "@playwright/test";
import { ReportConstants } from "./ReportConstants";
import { ReportService } from "./ReportService";

export class ScreenshotService {

    /**
     * Captures a full-page screenshot when a test fails and attaches it to the report.
     *
     * How it works:
     * - Ensures the screenshot storage folder exists.
     * - Generates a unique file name based on the test title and timestamp.
     * - Saves a full-page screenshot at that path.
     * - Attaches the image to the Playwright test object so it appears in the report.
     *
     * Why this matters:
     * A failure screenshot helps QA and developers understand the exact UI state
     * at the time of failure, especially for layout issues, unexpected dialogs, or
     * broken navigation steps that are hard to diagnose from logs alone.
     */
    public static async captureFailureScreenshot(
        page: Page,
        testInfo: TestInfo
    ): Promise<void> {

        if (!fs.existsSync(ReportConstants.SCREENSHOT_FOLDER)) {
            fs.mkdirSync(
                ReportConstants.SCREENSHOT_FOLDER,
                { recursive: true }
            );
        }

        const screenshotName =
            ReportService.generateScreenshotName(testInfo.title);

        const screenshotPath = path.join(
            ReportConstants.SCREENSHOT_FOLDER,
            screenshotName
        );

        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        await testInfo.attach(
            "Failure Screenshot",
            {
                path: screenshotPath,
                contentType: "image/png"
            }
        );

    }

}