import { Locator, Page } from "playwright";

export class QuickAccess {

    readonly page: Page
    readonly myProfileCard: Locator
    readonly myAppointmentsCard: Locator
    readonly myPrescriptionsCard: Locator
    readonly myOrdersCard: Locator
    constructor(page: Page) {
        this.page = page
        this.myProfileCard = page.locator('.dashboard-card').filter({ hasText: 'My Profile' });
        this.myAppointmentsCard = page.locator('.dashboard-card').filter({ hasText: 'My Appointments' });
        this.myPrescriptionsCard = page.locator('.dashboard-card').filter({ hasText: 'My Prescriptions' });
        this.myOrdersCard = page.locator('.dashboard-card').filter({ hasText: 'My Orders' });
    }

    async navigateToMyProfile() {
        await this.myProfileCard.click();
    }

    async navigateToMyAppointments() {
        await this.myAppointmentsCard.click();
    }

    async navigateToMyPrescriptions() {
        await this.myPrescriptionsCard.click();
    }

    async navigateToMyOrders() {
        await this.myOrdersCard.click();
    }
}