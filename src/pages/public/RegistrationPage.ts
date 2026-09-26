import { Locator, Page } from "playwright";
import { RegistrationData } from "../../types/RegistrationData";

export class RegistrationPage {

    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly emailAddress: Locator
    readonly password: Locator
    readonly confirmPassword: Locator
    readonly phoneNumber: Locator
    readonly address : Locator
    readonly dateOfBirth : Locator
    readonly accountType : Locator
    readonly gender : Locator
    readonly createAccount : Locator
    constructor(page: Page) {
        this.page = page
        this.firstName = page.getByRole('textbox', { name: 'First Name', exact: true })
        this.lastName = page.getByRole('textbox', { name: 'Last Name', exact: true })
        this.emailAddress = page.getByRole('textbox', { name: 'Email address', exact: true })
        this.password = page.getByRole('textbox', { name: 'Password', exact: true })
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password', exact: true })
        this.phoneNumber = page.getByRole('textbox',{name: 'Phone Number',exact : true})
        this.address = page.getByRole('textbox',{name: 'Address',exact : true})
        this.dateOfBirth = page.getByRole('textbox',{name :'Date of Birth'})
        this.accountType = page.getByRole('combobox',{name : 'Account Type'})
        this.gender = page.getByRole('combobox',{name:'Gender'})
        this.createAccount = page.getByRole('button',{name : 'Create Account'})
    }
   
    async createYourAccount(data: RegistrationData) {
        await this.firstName.fill(data.firstName)
        await this.lastName.fill(data.lastName)
        await this.emailAddress.fill(data.emailAddress)
        await this.password.fill(data.password)
        await this.confirmPassword.fill(data.confirmPassword)
        await this.phoneNumber.fill(data.phoneNumber)
        await this.address.fill(data.address)
        await this.dateOfBirth.fill(data.dateOfBirth)
        await this.accountType.selectOption({ label: data.accountType })
        await this.gender.selectOption({ label: data.gender })
        await this.createAccount.click()
    }
}