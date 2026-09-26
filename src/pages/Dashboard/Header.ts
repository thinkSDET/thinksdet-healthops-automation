import { Locator, Page } from "playwright"

export class Header {

    readonly page : Page
    readonly appUserName: Locator
    readonly appUserRole: Locator
    readonly logoutButton: Locator
    readonly doctorRequestLink: Locator
       constructor(page: Page) {
        this.page = page
        this.appUserName = page.locator("//span[@class='app-user-name']")
        this.appUserRole = page.locator("//span[@class='app-user-role']")
        this.logoutButton = page.locator("//button[@type='button' and text()=('Logout')]")
        this.doctorRequestLink = page.locator("//a//span[text()='Doctor Requests']")
    }

}