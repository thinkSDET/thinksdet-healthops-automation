import { Locator, Page } from "playwright";

export class LandingPage {
   readonly page: Page
   readonly navigateToCreateOrganizationButton: Locator
   constructor(page: Page) {
      this.page = page
      this.navigateToCreateOrganizationButton = page.getByRole('button', { name: 'Create an organization' })
   }


   async navigateToCreateOrganization() {
      await this.navigateToCreateOrganizationButton.click()
   }
}