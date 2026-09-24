import { Locator, Page } from "playwright"

export class LoginPage {

    readonly page: Page
    readonly organizationCreatedMessage: Locator
    readonly emailAddress: Locator
    readonly password: Locator
    readonly signIn: Locator

    constructor(page: Page) {
        this.page = page
        this.organizationCreatedMessage = page.getByText('Organization created successfully', { exact: false });
        this.emailAddress = page.getByPlaceholder('Enter your email')
        this.password = page.getByPlaceholder('Enter your password')
        this.signIn = page.locator("#loginSubmit")
    }

    async login(emailAddress: string, password: string) {
        await this.emailAddress.pressSequentially(emailAddress, { delay: 100 })
        await this.password.pressSequentially(password, { delay: 100 })
        await this.signIn.click()
    }

}