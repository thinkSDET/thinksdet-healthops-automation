import { ReportConstants } from "./ReportConstants";

export class ReportService {

    /**
     * Generates a unique screenshot name.
     */
    public static generateScreenshotName(testName: string): string {

        const now = new Date();

        const date =
            `${now.getFullYear()}${ReportConstants.DATE_SEPARATOR}` +
            `${String(now.getMonth() + 1).padStart(2, "0")}${ReportConstants.DATE_SEPARATOR}` +
            `${String(now.getDate()).padStart(2, "0")}`;

        const time =
            `${String(now.getHours()).padStart(2, "0")}${ReportConstants.TIME_SEPARATOR}` +
            `${String(now.getMinutes()).padStart(2, "0")}${ReportConstants.TIME_SEPARATOR}` +
            `${String(now.getSeconds()).padStart(2, "0")}`;

        const formattedTestName = testName
            .replace(/[<>:"/\\|?*]/g, "")
            .replace(/\s+/g, "_");

        return `${formattedTestName}_${date}_${time}.png`;

    }

}