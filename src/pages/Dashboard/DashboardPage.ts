import { Page } from "playwright";
import { TeamOnboarding } from "./TeamOnboarding";
import { Header } from "./Header";
import { QuickAccess } from "./QuickAccess";

export class DashboardPage {
    readonly page
    readonly teamOnboarding : TeamOnboarding
    readonly header : Header
    readonly quickAccess : QuickAccess
    constructor(page:Page){
        this.page = page
        this.teamOnboarding = new TeamOnboarding(page)
        this.header = new Header(page)
        this.quickAccess = new QuickAccess(page)
    }


}