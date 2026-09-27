import { Locator, Page } from "playwright";

export class LandingPage {
   readonly page: Page
   readonly createOrganizationButton: Locator
   readonly signIn: Locator
   constructor(page: Page) {
      this.page = page
      this.createOrganizationButton = page.getByRole('button', { name: 'Create an organization' })
      this.signIn = page.getByRole('button',{name:'Sign In',exact : true})
   }

   
   async navigateToCreateOrganization() {
      await this.createOrganizationButton.click()
   }

   async navigateToLoginPage(){
      await this.signIn.click()
   }
}