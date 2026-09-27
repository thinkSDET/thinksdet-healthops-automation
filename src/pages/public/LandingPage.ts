import { Locator, Page } from "playwright";
import { BasePage } from "../BasePage";
import { Routes } from "../../constants/Routes";

export class LandingPage extends BasePage {
   readonly createOrganizationButton: Locator
   readonly signIn: Locator
   constructor(page: Page) {
      super(page);
      this.createOrganizationButton = page.getByRole('button', { name: 'Create an organization' })
      this.signIn = page.getByRole('button',{name:'Sign In',exact : true})
   }

   async navigateToCreateOrganization() {
      await this.createOrganizationButton.click();
   }

   async navigateToLoginPage(){
      await this.signIn.click();
      await this.waitForNavigation(Routes.LOGIN);
   }
}