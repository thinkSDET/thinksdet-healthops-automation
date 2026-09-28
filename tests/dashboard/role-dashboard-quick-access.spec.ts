import { expect, test } from '../../src/fixtures/pageObjectFixture'
import { TestDataFactory } from '../../src/utils/TestDataFactory'
import { Routes } from '../../src/constants/Routes'
import { QuickAccessLabels } from '../../src/constants/QuickAccessLabels'

test(
    '[E2E-DASH-002] should navigate to the correct portal page when patient clicks a quick access card @P1 @tc:E2E-DASH-002',
    async ({ page, landingPage, loginPage, dashboardPage }) => {

        const patientLogin = TestDataFactory.validPatientLogin();
        const quickAccessCases = [
            { label: QuickAccessLabels.MY_PROFILE, navigate: () => dashboardPage.quickAccess.navigateToMyProfile(), expectedUrl: Routes.MY_PROFILE },
            { label: QuickAccessLabels.MY_APPOINTMENTS, navigate: () => dashboardPage.quickAccess.navigateToMyAppointments(), expectedUrl: Routes.MY_APPOINTMENTS },
            { label: QuickAccessLabels.MY_PRESCRIPTIONS, navigate: () => dashboardPage.quickAccess.navigateToMyPrescriptions(), expectedUrl: Routes.MY_PRESCRIPTIONS },
            { label: QuickAccessLabels.MY_ORDERS, navigate: () => dashboardPage.quickAccess.navigateToMyOrders(), expectedUrl: Routes.MY_ORDERS }
        ];

        await page.goto(Routes.HOME);
        await landingPage.navigateToLoginPage();
        await loginPage.login(
            patientLogin.emailAddress,
            patientLogin.password
        );

        for (const quickAccessCase of quickAccessCases) {
            await test.step(`Navigate to ${quickAccessCase.label}`, async () => {
                await page.goto(Routes.DASHBOARD);
                await quickAccessCase.navigate();
                await expect(page).toHaveURL(quickAccessCase.expectedUrl);
            });
        }
    }
);