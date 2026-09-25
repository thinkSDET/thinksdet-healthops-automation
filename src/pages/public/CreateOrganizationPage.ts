import { Locator, Page } from "playwright"
import { OrganizationData } from "../../types/OrganizationData"

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
    readonly workSpaceCodeAlert : Locator

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
        this.workSpaceCodeAlert = page.getByText('Workspace code is already in use',{exact : true})
    }

    async createOrganization(data: OrganizationData) {

        await this.organizationName.fill(data.organizationName)
        if (data.workspaceCode) {
            await this.workSpaceCode.fill(data.workspaceCode)
        }
        await this.adminFirstName.fill(data.adminFirstName)
        await this.adminLastName.fill(data.adminLastName)
        await this.adminEmail.fill(data.adminEmail)
        await this.password.fill(data.password)
        await this.confirmPassword.fill(data.confirmPassword)
        await this.createOrganizationButton.click()
    }
}