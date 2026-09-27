import { Locator, Page } from "playwright"
import { BasePage } from "../BasePage";
import { Routes } from "../../constants/Routes";

export class LoginPage extends BasePage {

    readonly organizationCreatedMessage: Locator
    readonly emailAddress: Locator
    readonly password: Locator
    readonly signIn: Locator
    readonly getStartedWithHealthOps : Locator

    constructor(page: Page) {
        super(page);
        this.organizationCreatedMessage = page.getByText('Organization created successfully', { exact: false });
        this.emailAddress = page.getByPlaceholder('Enter your email')
        this.password = page.getByPlaceholder('Enter your password')
        this.signIn = page.locator("#loginSubmit")
        this.getStartedWithHealthOps = page.getByRole('button',{name : 'Get started with HealthOps'})
    }

    async login(emailAddress: string, password: string) {
        await this.emailAddress.pressSequentially(emailAddress, { delay: 100 })
        await this.password.pressSequentially(password, { delay: 100 })
        await this.signIn.click()
        await this.waitForNavigation(Routes.DASHBOARD);
    }

    async navigateToGetStartedWithHealthOps(){
        await this.getStartedWithHealthOps.click()
    }

}