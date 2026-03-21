import { $, driver } from '@wdio/globals'

class loginPage {

        get email(){
            return $('~email')
        }

        get password(){
            if (driver.isAndroid)
                return $('android=new UiSelector().text("Password")')
            if (driver.isIOS)
                return $('~password')
        }

        get btnLogin(){
            if (driver.isAndroid)
                return $('~Login') //~means acessability tagId
            if (driver.isIOS)
                return $('~btnLogin')
        }

        get btnSignUp (){
            if (driver.isAndroid)
                return $('android=new UiSelector().text("Sign up")')
            if (driver.isIOS)
                return $('~signUp')
        }
        
        async login(email, password){
            await this.email.setValue(email)
            await this.password.setValue(password)
            await this.btnLogin.click()
        }


}

export default new loginPage();