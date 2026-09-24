import {test as base} from '@playwright/test'
import { LandingPage } from '../pages/public/LandingPage'
import { CreateOrganizationPage } from '../pages/public/CreateOrganizationPage'


type pageObjectFixture = {

    landingPage : LandingPage
    createOrgPage : CreateOrganizationPage
}


export const test = base.extend<pageObjectFixture>({
 
    landingPage : async({page},use)=>{
        await use(new LandingPage(page))
    },
  
    createOrgPage : async({page},use)=>{

        await use(new CreateOrganizationPage(page))
    }
})