import { $ } from '@wdio/globals'

class signUpPage  {
    get firstName(){
        return $('id:firstName')
    }

    get lastName(){
        return $('id:lastName')
    }
 
    get phoneNumber(){
        return $('id:phone')
    }

    get emailAdress(){
        return $('id:email')
    }

    get password(){
        if(driver.isAndroid)
            return $('android=new UiSelector().text("Password")')
        if(driver.isIOS)
            return $('~password')
    }

    get reEnterPassword(){
        if(driver.isAndroid)
            return $('id:repassword')
        if(driver.isIOS)
            return $('~repassword')
    }

    get btnCreate(){
        if(driver.isAndroid)
            return $('android=new UiSelector().text("Create")')
        if(driver.isIOS)
            return $('~create')
    }
}

export default new signUpPage();