import { expect } from 'playwright/test'
import {test} from '../../../src/fixtures/pageObjectFixture'
import {OrganizationDataFactory} from '../../../src/utils/OrganizationDataFactory'
import { LoginMessages } from '../../../src/constants/LoginMessages'

test.describe('Authentication & Account Security @module:auth @feature:organization-onboarding',()=>{

test('[MOD-AUTH-001] should onboard organization via UI and sign in as admin @P0 @tc:MOD-AUTH-001',async({page,landingPage,createOrgPage,loginPage})=>{
    await page.goto("https://thinksdet.com/")
    await landingPage.navigateToCreateOrganization()
    const organizationData = OrganizationDataFactory.validOrganization();
    await createOrgPage.createOrganization(organizationData)
    await expect(loginPage.organizationCreatedMessage).toHaveText(LoginMessages.organizationCreated)
    await expect(page).toHaveURL("https://thinksdet.com/login")
    await loginPage.login(organizationData.adminEmail,organizationData.password)
    await expect(page).toHaveURL("https://thinksdet.com/dashboard")
})
})