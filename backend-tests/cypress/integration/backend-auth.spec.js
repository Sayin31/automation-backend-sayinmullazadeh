 import * as clientHelpers from '../helpers/clientHelpers'
 
 
 describe('testing auth', function(){
    it ('Test case 1', function(){
        cy.authenticateSession().then((response =>{
            cy.request({
            method: "GET",
            url: 'http://localhost:3000/api/clients',
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
           }).then((response =>{
               cy.log(response.body[0].id)
               cy.log(response.body[0].created)
               cy.log(response.body[0].name)
               cy.log(response.body[0].email)
               cy.log(response.body[0].telephone)
           }))
        }))
    })

    it ('Test case 2, Create a new client', function(){
        clientHelpers.createClientRequest(cy)
    })

    it ('Test case 3, Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
    })

    it('Test case4, Create a client and delete it', function(){
        clientHelpers.createClientRequestAndDelete(cy)
    })

})