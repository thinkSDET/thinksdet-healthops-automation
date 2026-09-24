import {test} from '../../../src/fixtures/pageObjectFixture'
import {OrganizationDataFactory} from '../../../src/utils/OrganizationDataFactory'

test.describe('Authentication & Account Security @module:auth @feature:organization-onboarding',()=>{

test('[MOD-AUTH-001] should onboard organization via UI and sign in as admin @P0 @tc:MOD-AUTH-001',async({page,landingPage,createOrgPage})=>{
    await page.goto("https://thinksdet.com/")
    await landingPage.navigateToCreateOrganization()
    const organizationData = OrganizationDataFactory.validOrganization();
    await createOrgPage.createOrganization(organizationData.organizationName,organizationData.adminFirstName,
        organizationData.adminLastName,organizationData.adminEmail,organizationData.password,organizationData.confirmPassword,organizationData.workspaceCode
    )
    await page.waitForTimeout(30000)
})
})