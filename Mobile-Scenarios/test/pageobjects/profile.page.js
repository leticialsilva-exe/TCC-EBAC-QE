import { $ } from '@wdio/globals'

class profilePage  {
    async profileInfo(text){
        return $(`//android.widget.TextView[@text="${text}"]`)
    }

}

export default new profilePage();