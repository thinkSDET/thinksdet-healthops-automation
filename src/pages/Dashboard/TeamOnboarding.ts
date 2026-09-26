import { Locator, Page } from "playwright";

export class TeamOnboarding {

    readonly page : Page
    readonly teamOnBoardingCopyLinkButton : Locator
    readonly teamRegistrationLink : Locator

    constructor(page :Page){
        this.page = page
        this.teamOnBoardingCopyLinkButton = page.getByRole('button',{name : 'Copy link',exact : true})
        this.teamRegistrationLink = page.locator('#teamRegistrationLink')
    }
  
    async getRegistrationLink() :Promise<string>{
       
       return await this.teamRegistrationLink.inputValue()

    }

}