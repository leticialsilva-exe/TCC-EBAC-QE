

import { expect , driver} from '@wdio/globals'
import homePage from '../pageobjects/home.page.js'
import listaDesejosPage from '../pageobjects/listaDesejos.page.js'

describe('My Login application', () => {
    it('Should navigate to Lista de Desejos', async () => {
        await expect(homePage.ebacHomeLogo).toBeDisplayed()
        await driver.pause(2000)
        await homePage.openMenuNavegacao()
        expect((await homePage.menuNavegacao).isDisplayed()).toBeTruthy()
        await homePage.clicarMenuListaDeDesejos
        expect((await listaDesejosPage.menuListaDeDesejos()).isDisplayed()).toBeTruthy()
    })
})