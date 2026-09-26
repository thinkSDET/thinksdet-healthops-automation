import { Page } from "playwright";
import { TeamOnboarding } from "./TeamOnboarding";

export class DashboardPage {
    readonly page
    readonly teamOnboarding : TeamOnboarding
    constructor(page:Page){
        this.page = page
        this.teamOnboarding = new TeamOnboarding(page)
    }


}