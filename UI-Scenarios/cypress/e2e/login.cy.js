/// <reference types="cypress" />
const perfil  = require('../fixtures/perfil.json')

describe('Funcionalidade: Login', ()=> {

    beforeEach(() => {
        cy.setCookie('ebacStoreVersion',`v2`, {domain:'lojaebac.ebaconline.art.br'})
        cy.visit('/minha-conta')
    });

    afterEach(() => {
        // cy.screenshot()
    });


    it('Deve fazer login com sucesso', () => {
        cy.fixture('perfil').then( dados => {
            cy.login(dados.usuario, dados.senha)
            cy.get('[href="/Tab/Account"]').should('contain','Profile')    
        })
    });

    it('Deve exibir uma mensagem de erro ao inserir o usuário inválido', () => {
        cy.fixture('perfil').then( dados => {
            cy.login("leticia.ebac@test.com", dados.senha)
            cy.get('[data-testid="warning"]').should('contain', 'Email is incorrect')
        })
    });

    it('Deve exibir uma mensagem de erro ao inserir o senha inválida', () => {
        cy.fixture('perfil').then( dados => {
            cy.login(dados.usuario, 'Senha321')
            cy.get('[data-testid="warning"]').should('contain', 'Password is incorrect')
        })
    });

    it('Deve exibir uma mensagem de bloqueio ao errar a senha tres vezes', () => {
        cy.clickMenu('Account')
        for(let i = 0; i < 3; i++) {
            cy.fixture('perfil').then( dados => {
                cy.clickByID('email').clear().type(dados.usuario)
                cy.clickByID('password').clear().type('Senha321'+i)
                cy.clickByID('btnLogin')
                cy.get('[data-testid="warning"]').should('contain', 'Password is incorrect')
            })
        }
    });

})