const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_PUT_CLIENT1 = 'http://localhost:3000/api/client/1'
const ENDPOINT_PUT_CLIENT2 = 'http://localhost:3000/api/client/2'

function createRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }
    return payload
}

function getRequestAllClientsWithAssertion(cy, name, email, telephone){
     // GET request to fetch all clients
     cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)

        cy.log(response.body[response.body.length -1].id)
        cy.log(response.body.length)

       }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
           }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
           }))
    }))
}

function deleteRequestAfterGet(cy){
    // GET request to fetch all clients
    cy.request({
       method: "GET",
       url: ENDPOINT_GET_CLIENTS,
       headers:{
           'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
           'Content-Type': 'application/json'
       },
      }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            //cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
          }))
      }))
}

function createClientRequest(cy){
    cy.authenticateSession().then((response =>{
    
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
        method: "POST",
        url: ENDPOINT_POST_CLIENT,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: fakeClientPayload

       }).then((response =>{
         
         const responseAsString = JSON.stringify(response)
         expect(responseAsString).to.have.string(fakeClientPayload.name)
       }))

       getRequestAllClientsWithAssertion(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}

function createClientRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
       
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
        method: "POST",
        url: ENDPOINT_POST_CLIENT,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: fakeClientPayload

       }).then((response =>{
         const responseAsString = JSON.stringify(response)
         expect(responseAsString).to.have.string(fakeClientPayload.name)
       }))

       // Delete
       deleteRequestAfterGet(cy)
    }))
}

function editFirstClient(cy){
    const editFirstClient = 
    {
        "id": 1,
        "created": "2020-01-05T12:00:00.000Z",
        "name": "Peter B. Parker",
        "email": "peterbp@dailybugle.com",
        "telephone": "42"
    }
    cy.authenticateSession().then((response =>{
        cy.request({
        method: "PUT",
        url: ENDPOINT_PUT_CLIENT1,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }, body:editFirstClient
       })
    }))
}

function editSecondClient(cy){
    const editSecondClient = 
    {
        "id": 2,
        "created": "2020-01-06T12:00:00.000Z",
        "name": "Logan",
        "email": "weaponx@xmen.com",
        "telephone": "X"
    }
    cy.authenticateSession().then((response =>{
        cy.request({
        method: "PUT",
        url: ENDPOINT_PUT_CLIENT2,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }, body:editSecondClient
       })
    }))
}

// Export module
module.exports = {
    createRandomClientPayload,
    createClientRequest,
    getAllClientsRequest,
    createClientRequestAndDelete,
    editFirstClient,
    editSecondClient
}