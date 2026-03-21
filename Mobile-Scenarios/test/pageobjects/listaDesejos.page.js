import { $ , driver } from '@wdio/globals'

class listaDesejosPage {

        async menuListaDeDesejos(){
            if(driver.isIOS)
                return $(`~Lista de Desejos`)
        }

}
export default new listaDesejosPage();
    