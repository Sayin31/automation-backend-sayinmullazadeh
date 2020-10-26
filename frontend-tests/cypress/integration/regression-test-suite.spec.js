/// <reference types="cypress" />

/// This is a test suite
describe('Regression test suite', function(){
    
    // This is a test case
    it('Perform valid login', function(){
        cy.visit('http://localhost:3000')
    })
})