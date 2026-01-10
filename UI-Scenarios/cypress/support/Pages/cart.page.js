/// <reference types="cypress"/>

class cartPage {

    title () { return cy.get('.r-1awozwy > [style="color: rgb(255, 255, 255); font-size: 20px; font-family: Montserrat-Bold;"]') }
    totalPrice () { return cy.get('.r-1mmae3n > :nth-child(2) > [data-testid="price"]') }
}

module.exports = new cartPage();