import { $ , driver } from '@wdio/globals'

class HomePage {

        async openMenuNavegacao(){
            if(driver.isIOS)
                await $(`~Abrir menu de navegação`).click()
        }

        get ebacHomeLogo(){
            if(driver.isIOS)
                return $('XCUIElementTypeImage')
         }

         get menuNavegacao(){
            if(driver.isIOS)
                return $('~Cardápio')
        }

        async clicarMenuListaDeDesejos(){
            if(driver.isIOS)
                await $('~Lista de Desejos').click()
        }   
    
}

export default new HomePage();