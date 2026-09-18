import {test} from '@playwright/test'
import { LandingPage } from '../../../src/pages/public/LandingPage'
import { CreateOrganizationPage } from '../../../src/pages/public/CreateOrganizationPage'

test.describe('Authentication & Account Security @module:auth @feature:organization-onboarding',()=>{

test('[MOD-AUTH-001] should onboard organization via UI and sign in as admin @P0 @tc:MOD-AUTH-001',async({page})=>{
    await page.goto("https://thinksdet.com/")
    const landingPage = new LandingPage(page)
    await landingPage.navigateToCreateOrganization()
    const objCreateOrgPage = new CreateOrganizationPage(page)
})
})