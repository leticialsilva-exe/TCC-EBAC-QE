import { $ , driver } from '@wdio/globals'

class HomePage {

        async openMenu(menu){
            if(driver.isAndroid)
                await $(`id:tab-${menu}`).click()
            if(driver.isIOS)
                await $(`~tab-${menu}`).click()
        }

        get ebacHomeLogo(){
            if(driver.isAndroid)
                return $('android=new UiSelector().text("EBAC Store")')
            if(driver.isIOS)
                return $('//XCUIElementTypeStaticText[@name="EBAC Store"]')
         }
}

export default new HomePage();