/**
 * Helper methods for building stable report artifact names.
 *
 * This service is responsible for generating screenshot names that are unique,
 * readable, and safe for file systems. These names are used to store failure
 * evidence without overwriting previous screenshots and to keep reports easy to
 * understand when reviewing automated test results.
 */
import { ReportConstants } from "./ReportConstants";

export class ReportService {

    /**
     * Generates a unique and safe screenshot file name for a test.
     *
     * How it works:
     * 1. Reads the current date and time.
     * 2. Formats them using the shared report constants.
     * 3. Removes characters that are invalid in file names on Windows and other OSes.
     * 4. Replaces spaces with underscores to keep the output readable and predictable.
     *
     * Why this is needed:
     * Different tests may fail at different times, and filenames must be unique to
     * avoid overriding old screenshots. Sanitizing names also prevents invalid path
     * issues when pictures are saved on disk.
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