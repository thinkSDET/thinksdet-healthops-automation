import { expect } from 'playwright/test'
import { test } from '../../../src/fixtures/pageObjectFixture'
import { OrganizationDataFactory } from '../../../src/utils/OrganizationDataFactory'
import { LoginMessages } from '../../../src/constants/LoginMessages'
import { createOrganization } from '../../../src/constants/CreateOrganization'

test.describe('Authentication & Account Security @module:auth @feature:organization-onboarding', () => {

    test('[MOD-AUTH-001] [E2E-AUTH-001] should onboard organization via UI and sign in as admin @P0 @tc:MOD-AUTH-001', async ({ page, landingPage, createOrgPage, loginPage }) => {
        await page.goto("https://thinksdet.com/")
        await landingPage.navigateToCreateOrganization()
        const organizationData = OrganizationDataFactory.validOrganization();
        await createOrgPage.createOrganization(organizationData)
        await expect(loginPage.organizationCreatedMessage).toHaveText(LoginMessages.organizationCreated)
        await expect(page).toHaveURL("https://thinksdet.com/login")
        await loginPage.login(organizationData.adminEmail, organizationData.password)
        await expect(page).toHaveURL("https://thinksdet.com/dashboard")
    })

    test('[NEG-AUTH-003] should reject organization onboarding when workspaceCode already exists @P0 @tc:NEG-AUTH-003', async ({ page, landingPage, createOrgPage, loginPage }) => {
        let existingWorkspaceCode: string | undefined
        await test.step('Navigate to organization onboarding', async () => {
            await page.goto('https://thinksdet.com/');
            await landingPage.navigateToCreateOrganization();
        });
        await test.step('Create an existing organization', async () => {
            const existingOrganization = OrganizationDataFactory.validOrganization();
            await createOrgPage.createOrganization(existingOrganization);
            existingWorkspaceCode = existingOrganization.workspaceCode;
            await expect(loginPage.organizationCreatedMessage).toHaveText(LoginMessages.organizationCreated);
        });
        await test.step('Submit organization with duplicate workspace code', async () => {
            await loginPage.navigateToGetStartedWithHealthOps();
            await landingPage.navigateToCreateOrganization();
            const duplicateOrganization = OrganizationDataFactory.validOrganization();
            duplicateOrganization.workspaceCode = existingWorkspaceCode;
            await createOrgPage.createOrganization(duplicateOrganization);
        });
        await test.step('Verify duplicate workspace code error', async () => {
            await expect(createOrgPage.workSpaceCodeAlert).toHaveText(createOrganization.workSpaceCodeAlreadyExist);
        });
    })
})

