import { expect } from 'playwright/test';
import { test } from '../../../src/fixtures/pageObjectFixture'
import { RegistrationPage } from '../../../src/pages/public/RegistrationPage';
import { OrganizationDataFactory } from '../../../src/utils/OrganizationDataFactory';
import testData from '../../../src/test-data/public-registration.json'
import { LoginPage } from '../../../src/pages/public/LoginPage';

test('[MOD-AUTH-010] should register a patient into an existing workspace @P0 @tc:MOD-AUTH-010', async ({ page, landingPage, createOrgPage, loginPage, dashboardPage }) => {
    const organizationData = OrganizationDataFactory.validOrganization();

    await test.step('Open app and create organization', async () => {
        await page.goto('https://thinksdet.com/');
        await landingPage.navigateToCreateOrganization();
        await createOrgPage.createOrganization(organizationData);
    });
    await test.step('Login as workspace admin', async () => {
        console.log(organizationData.adminEmail)
        console.log(organizationData.adminLastName)
        await loginPage.login(organizationData.adminEmail, organizationData.password);
    });

    await test.step('Open patient registration workflow', async () => {
        const regLink = await dashboardPage.teamOnboarding.getRegistrationLink()
        const context = page.context()
        const newPage = await context.newPage()
        await newPage.goto(regLink)
        const registrationPage = new RegistrationPage(newPage)
        await registrationPage.createYourAccount(testData.patientRegistration)
    });

    await test.step('Login as registered patient and verify dashboard access', async () => {
        await page.goto('https://thinksdet.com/');
        const patientLoginPage = new LoginPage(page);
        await patientLoginPage.login(testData.patientRegistration.emailAddress, testData.patientRegistration.password);
        await expect(page).toHaveURL('https://thinksdet.com/dashboard')
        await expect(dashboardPage.header.appUserName).toHaveText(`${testData.patientRegistration.firstName} ${testData.patientRegistration.lastName}`)
        await expect(dashboardPage.header.appUserRole).toHaveText(`${testData.patientRegistration.accountType}`)
    });
})