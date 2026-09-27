import { Locator, Page } from "playwright";
import { BasePage } from "../BasePage";

export class QuickAccess extends BasePage {

    readonly myProfileCard: Locator
    readonly myAppointmentsCard: Locator
    readonly myPrescriptionsCard: Locator
    readonly myOrdersCard: Locator
    constructor(page: Page) {
        super(page);
        this.myProfileCard = page.locator('.dashboard-card').filter({ hasText: 'My Profile' });
        this.myAppointmentsCard = page.locator('.dashboard-card').filter({ hasText: 'My Appointments' });
        this.myPrescriptionsCard = page.locator('.dashboard-card').filter({ hasText: 'My Prescriptions' });
        this.myOrdersCard = page.locator('.dashboard-card').filter({ hasText: 'My Orders' });
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