

import { expect , driver} from '@wdio/globals'
import homePage from '../pageobjects/home.page.js'
import loginPage from '../pageobjects/login.page.js'
import profilePage from '../pageobjects/profile.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        let profileMenu = driver.isAndroid ? 'profile' : 'Account'
        await homePage.openMenu(profileMenu)
        await loginPage.login('lele@ebac.com','ebac123')
        await loginPage.login('lele@ebac.com','ebac123')
        await homePage.openMenu("Account")
        expect((await profilePage.profileInfo('Lopes Silva')).isDisplayed()).toBeTruthy()
    })
})