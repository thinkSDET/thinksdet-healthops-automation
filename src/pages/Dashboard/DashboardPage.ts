import { Page } from "playwright";
import { TeamOnboarding } from "./TeamOnboarding";
import { Header } from "./Header";

export class DashboardPage {
    readonly page
    readonly teamOnboarding : TeamOnboarding
    readonly header : Header
    constructor(page:Page){
        this.page = page
        this.teamOnboarding = new TeamOnboarding(page)
        this.header = new Header(page)
    }


}