import {test} from '../../../src/fixtures/pageObjectFixture'
import { DashboardPage } from '../../../src/pages/Dashboard/DashboardPage';

test('[MOD-AUTH-010] should register a patient into an existing workspace @P0 @tc:MOD-AUTH-010',async({page,landingPage,createOrgPage,loginPage})=>{
    await page.goto('https://thinksdet.com/');
    await loginPage.login("admin123@healthops.local","12345678");
    const dashboard = new DashboardPage(page)
    const regLink = await dashboard.teamOnboarding.getRegistrationLink()
    const context  = page.context()
    const newPage  = await context.newPage()
    await newPage.goto(regLink)
    await page.waitForTimeout(3000)
})