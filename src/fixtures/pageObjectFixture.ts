import {test as base} from '@playwright/test'
import { LandingPage } from '../pages/public/LandingPage'
import { CreateOrganizationPage } from '../pages/public/CreateOrganizationPage'
import { LoginPage } from '../pages/public/LoginPage'


type pageObjectFixture = {

    landingPage : LandingPage
    createOrgPage : CreateOrganizationPage
    loginPage : LoginPage
}


export const test = base.extend<pageObjectFixture>({
 
    landingPage : async({page},use)=>{
        await use(new LandingPage(page))
    },
  
    createOrgPage : async({page},use)=>{

        await use(new CreateOrganizationPage(page))
    },
    loginPage : async({page},use)=>{
        await use(new LoginPage(page))
    }
})