const { faker } = require("@faker-js/faker/locale/pt_BR");
const {usuario, senha} = require("../fixtures/perfil.json");
const  cartPage  = require("../support/Pages/cart.page.js")

describe('Checkout testing', () => {
    const dayjs = require('dayjs')

    beforeEach(() => {
        cy.setCookie('ebacStoreVersion',`v2`, {domain:'lojaebac.ebaconline.art.br'})
        cy.visit('/')
        
    });

    afterEach(() => {
        cy.get('[data-testid="remove"] > .css-146c3p1').click({multiple: true, force: true})
    });

    it.only('Should try to do a checkout sucessfully', () => {
        cy.login(usuario, senha)
        cy.clickMenu('Browse')
        cy.chooseAnItemToBuy()
        cy.clickByID('addToCart')
        });

    it('Validar desconto de 10% para carrinhos R$599,99 de produtos', () => {
        cy.login(usuario, senha)
        cy.clickMenu('Browse')
        cy.chooseAnItemToBuy()
        cy.clickByID('addToCart')

        // check if we are in the cart
        cartPage.title().should('contain','My Cart')
        
        //saving the cart total and discount 
        let price 
        cartPage.totalPrice().invoke('text').then( (text) => {
            let valor = text.replace('R$','').replace(',','.')
            cy.log(`O texto capturado é: ${valor}`);
            price = (valor)
        })
        cy.then(() => {
            if (price > 599.99) {
                throw new Error('O valor do carrinho é maior que R$599,99, o teste não pode ser executado.')
            }   else {  
                let discountValue = (price*0.1).toFixed(2).toString()
                cy.get('[data-testid="discount"]').should('contain', discountValue)
                cy.get('[data-testid="total"]').should('contain', price - discountValue)
            }

        })
    });

    it('Validar desconto de 15% para carrinhos com mais de R$599,99 de produtos', () => {
        cy.login(usuario, senha)
        cy.clickMenu('Browse')
        cy.chooseAnItemToBuy()
        cy.clickByID('addToCart')

        // check if we are in the cart
        cartPage.title().should('contain','My Cart')
        
        //adding more items to reach the minimum value
        for (let i = 0; i < 5; i++)
            cy.get('[data-testid="addItem"] > .css-146c3p1').click()


        //saving the cart total and discount 
        let price 
        cartPage.totalPrice().invoke('text').then( (text) => {
            let valor = text.replace('R$','').replace(',','.')
            cy.log(`O texto capturado é: ${valor}`);
            price = (valor)
        })
        cy.then(() => {
            if (price < 599.99) {
                throw new Error('O valor do carrinho é menor que R$599,99, o teste não pode ser executado.')
            }   else {  
                let discountValue = (price*0.1).toFixed(2).toString()
                cy.get('[data-testid="discount"]').should('contain', discountValue)
                cy.get('[data-testid="total"]').should('contain', price - discountValue)
            }

        })
    });



});
