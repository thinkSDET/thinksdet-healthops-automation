import { Locator, Page } from "playwright"

 export class CreateOrganizationPage {

    readonly page: Page
    readonly organizationName: Locator
    readonly workSpaceCode: Locator
    readonly adminFirstName: Locator
    readonly adminLastName: Locator
    readonly adminEmail: Locator
    readonly password: Locator
    readonly confirmPassword: Locator
    readonly createOrganizationButton : Locator

    constructor(page: Page) {
        this.page = page
        this.organizationName = page.getByRole('textbox', { name: 'Organization Name' })
        this.workSpaceCode = page.getByRole('textbox', { name: 'workspaceSlug' })
        this.adminFirstName = page.getByRole('textbox', { name: 'firstName' })
        this.adminLastName = page.getByRole('textbox', { name: 'lastName' })
        this.adminEmail = page.getByRole('textbox', { name: 'email' })
        this.password = page.getByRole('textbox', { name: 'password' })
        this.confirmPassword = page.getByRole('textbox', { name: 'confirmPassword' })
        this.createOrganizationButton = page.getByRole('button',{name : 'Create Organization'})
    }

    async createOrganization(){
        this.organizationName.fill("")
        await this.createOrganizationButton.click()
    }



}