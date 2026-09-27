import { expect, test } from '../../../src/fixtures/pageObjectFixture'
import { TestDataFactory } from '../../../src/utils/TestDataFactory'

test('[E2E-DASH-002] should navigate to the correct portal page when patient clicks a quick access card @P1 @tc:E2E-DASH-002', async ({ page, landingPage, loginPage, dashboardPage }) => {
    const patientLogin = TestDataFactory.validPatientLogin();

    await page.goto('')
    await landingPage.navigateToLoginPage()
    await loginPage.login(patientLogin.emailAddress, patientLogin.password)

    await test.step('Navigate to My Profile', async () => {
        await dashboardPage.quickAccess.navigateToMyProfile();
        await expect(page).toHaveURL('https://thinksdet.com/my/profile')
    });
    await page.goBack()
    await test.step('Navigate to My Appointments', async () => {
        await dashboardPage.quickAccess.navigateToMyAppointments();
        await expect(page).toHaveURL(
            'https://thinksdet.com/my/appointments'
        );
    });
    await page.goBack()
    await test.step('Navigate to My Prescriptions', async () => {
        await dashboardPage.quickAccess.navigateToMyPrescriptions();
        await expect(page).toHaveURL(
            'https://thinksdet.com/my/prescriptions'
        );
    });
    await page.goBack()
    await test.step('Navigate to My Orders', async () => {
        await dashboardPage.quickAccess.navigateToMyOrders();
        await expect(page).toHaveURL(
            'https://thinksdet.com/my/orders'
        );
    });
})