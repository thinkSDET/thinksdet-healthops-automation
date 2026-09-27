import { Page } from 'playwright';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async waitForNavigation(expectedUrl: string | RegExp) {
        await this.page.waitForURL(expectedUrl);
        await this.page.waitForLoadState('networkidle');
    }
}
