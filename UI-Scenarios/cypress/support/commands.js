// File: UI-Scenarios/cypress/support/commands.js
const { faker } = require("@faker-js/faker/locale/pt_BR");

Cypress.Commands.add('login', (usuario, senha) => { 
    cy.clickMenu('Account')
    cy.clickByID('email').clear().type(usuario)
    cy.clickByID('password').clear().type(senha)
    cy.clickByID('btnLogin')

 })

  Cypress.Commands.add('clickMenu', (menuName) => {
    cy.get(`[href="/Tab/${menuName}"]`).click()
 })

 Cypress.Commands.add('clickByID', (id) => {
    cy.get(`[data-testid="${id}"]`).click()
 })

 Cypress.Commands.add('chooseAnItemToBuy', () => {
    cy.get('div[class*="r-u8s1d r-zchlnj"][style="z-index: 0; display: flex;"] div[data-testid="productDetails"]')
    .eq(faker.number.int({ min: 5, max: 10 }))
    .click()
 })
