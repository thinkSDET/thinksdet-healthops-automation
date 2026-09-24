import { Locator, Page } from "playwright"

export class LoginPage {

    readonly page: Page
    readonly organizationCreatedMessage : Locator

    constructor(page: Page) {
        this.page = page
         this.organizationCreatedMessage = page.getByText('Organization created successfully',{ exact: false }
    );

    }


}