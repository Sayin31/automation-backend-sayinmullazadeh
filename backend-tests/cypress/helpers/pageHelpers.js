const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_GET_RESERVATIONS = 'http://localhost:3000/api/reservations'

function checkAllPages(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,

        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       }).then((response =>{
           cy.log(response.body.length)
       }))
    }))
    cy.authenticateSession().then((response =>{
        cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,

        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       }).then((response =>{
           cy.log(response.body.length)
       }))
    }))
    cy.authenticateSession().then((response =>{
        cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,

        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       }).then((response =>{
           cy.log(response.body.length)
       }))
    }))
    cy.authenticateSession().then((response =>{
        cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,

        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       }).then((response =>{
           cy.log(response.body.length)
       }))
    }))
}

// Export module
module.exports = {
    checkAllPages
}