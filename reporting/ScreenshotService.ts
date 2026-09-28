import path from "path";
import fs from "fs";
import { Page, TestInfo } from "@playwright/test";
import { ReportConstants } from "./ReportConstants";
import { ReportService } from "./ReportService";

export class ScreenshotService {

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