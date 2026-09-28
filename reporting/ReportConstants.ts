/**
 * Central configuration values for the reporting layer.
 *
 * This file keeps all report-related naming rules in one place so screenshots,
 * timestamps, and other generated artifacts follow a consistent format across the
 * project. Centralizing these values makes it easier to update naming patterns
 * later without changing multiple files.
 */
export class ReportConstants {

    /**
     * Folder used to store failure screenshots captured during test execution.
     *
     * Keeping screenshots in a dedicated folder makes it easier to trace failed
     * runs and attach them to the test report or debugging artifacts.
     */
    public static readonly SCREENSHOT_FOLDER = "./screenshot";

    /**
     * Separator used between the year, month, and day in generated file names.
     *
     * This creates a readable date format such as YYYY-MM-DD while keeping the
     * name stable and easier to sort chronologically.
     */
    public static readonly DATE_SEPARATOR = "-";

    /**
     * Separator used between hour, minute, and second in generated file names.
     *
     * This keeps timestamps consistent and avoids collisions when multiple tests
     * fail within the same day.
     */
    public static readonly TIME_SEPARATOR = "-";

}