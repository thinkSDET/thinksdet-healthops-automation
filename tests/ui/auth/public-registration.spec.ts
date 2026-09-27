import { expect } from 'playwright/test';
import { test } from '../../../src/fixtures/pageObjectFixture'
import { RegistrationPage } from '../../../src/pages/public/RegistrationPage';
import { TestDataFactory } from '../../../src/utils/TestDataFactory';

test('[MOD-AUTH-010] should register a patient into an existing workspace @P0 @tc:MOD-AUTH-010', async ({ page, landingPage, createOrgPage, loginPage, dashboardPage }) => {
    const organizationData = TestDataFactory.validOrganization();
    const patientRegistration = TestDataFactory.patientRegstration()

    await test.step('Open app and create organization', async () => {
        await page.goto('');
        await landingPage.navigateToCreateOrganization();
        await createOrgPage.createOrganization(organizationData);
    });
    await test.step('Login as workspace admin', async () => {
        await loginPage.login(organizationData.adminEmail, organizationData.password);
    });

    await test.step('Open patient registration workflow', async () => {
        const regLink = await dashboardPage.teamOnboarding.getRegistrationLink()
        const context = page.context()
        const newPage = await context.newPage()
        await newPage.goto(regLink)
        const registrationPage = new RegistrationPage(newPage)
        await registrationPage.createYourAccount(patientRegistration)
    });

    await test.step('Login as registered patient and verify dashboard access', async () => {
        await page.bringToFront()
        await page.goto('https://thinksdet.com/login');
        await loginPage.login(patientRegistration.emailAddress, patientRegistration.password);
        await expect(page).toHaveURL('https://thinksdet.com/dashboard')
        await expect(dashboardPage.header.appUserName).toHaveText(`${patientRegistration.firstName} ${patientRegistration.lastName}`)
        await expect(dashboardPage.header.appUserRole).toHaveText(`${patientRegistration.accountType}`,{ignoreCase :true})
    });
})