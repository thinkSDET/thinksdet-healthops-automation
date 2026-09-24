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
    readonly createOrganizationButton: Locator

    constructor(page: Page) {
        this.page = page
        this.organizationName = page.getByRole('textbox', { name: 'Organization Name' })
        this.workSpaceCode = page.getByRole('textbox', { name: 'Workspace Code (optional)' })
        this.adminFirstName = page.getByRole('textbox', { name: 'Admin First Name' })
        this.adminLastName = page.getByRole('textbox', { name: 'Admin Last Name' })
        this.adminEmail = page.getByRole('textbox', { name: 'Admin Email' })
        this.password = page.getByRole('textbox', { name: 'Password', exact: true })
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password' })
        this.createOrganizationButton = page.getByRole('button', { name: 'Create Organization' })
    }

    async createOrganization(orgname: string, adminFN: string, adminLn: string, adminEmail: string, password: string,
        confirmPassword: string, workSpaceCode?: string) {

        await this.organizationName.fill(orgname)
        if (workSpaceCode) {
            await this.workSpaceCode.fill(workSpaceCode)
        }
        await this.adminFirstName.fill(adminFN)
        await this.adminLastName.fill(adminLn)
        await this.adminEmail.fill(adminEmail)
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmPassword)
    }
}