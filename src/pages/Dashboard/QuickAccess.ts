import { Locator, Page } from "playwright";
import { BasePage } from "../BasePage";
import { QuickAccessLabels } from "../../constants/QuickAccessLabels";

export class QuickAccess extends BasePage {

    readonly myProfileCard: Locator
    readonly myAppointmentsCard: Locator
    readonly myPrescriptionsCard: Locator
    readonly myOrdersCard: Locator
    constructor(page: Page) {
        super(page);
        this.myProfileCard = page.locator('.dashboard-card').filter({ hasText: QuickAccessLabels.MY_PROFILE });
        this.myAppointmentsCard = page.locator('.dashboard-card').filter({ hasText: QuickAccessLabels.MY_APPOINTMENTS });
        this.myPrescriptionsCard = page.locator('.dashboard-card').filter({ hasText: QuickAccessLabels.MY_PRESCRIPTIONS });
        this.myOrdersCard = page.locator('.dashboard-card').filter({ hasText: QuickAccessLabels.MY_ORDERS });
    }

    async navigateToMyProfile() {
        await this.myProfileCard.click();
        await this.waitForNavigation(/\/my\/profile$/);
    }

    async navigateToMyAppointments() {
        await this.myAppointmentsCard.click();
        await this.waitForNavigation(/\/my\/appointments$/);
    }

    async navigateToMyPrescriptions() {
        await this.myPrescriptionsCard.click();
        await this.waitForNavigation(/\/my\/prescriptions$/);
    }

    async navigateToMyOrders() {
        await this.myOrdersCard.click();
        await this.waitForNavigation(/\/my\/orders$/);
    }
}