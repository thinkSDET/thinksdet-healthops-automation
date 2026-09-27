import { Page } from "playwright";
import { TeamOnboarding } from "./TeamOnboarding";
import { Header } from "./Header";
import { QuickAccess } from "./QuickAccess";
import { BasePage } from "../BasePage";

export class DashboardPage extends BasePage {
    readonly teamOnboarding : TeamOnboarding
    readonly header : Header
    readonly quickAccess : QuickAccess
    constructor(page:Page){
        super(page);
        this.teamOnboarding = new TeamOnboarding(page)
        this.header = new Header(page)
        this.quickAccess = new QuickAccess(page)
    }


}