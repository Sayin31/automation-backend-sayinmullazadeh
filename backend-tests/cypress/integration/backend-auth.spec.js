 import * as clientHelpers from '../helpers/clientHelpers'
 import * as pageHelpers from '../helpers/pageHelpers'
 
 
 describe('Testing auth', function(){
    it ('Test case 1, Get the content amount of every page', function(){
        pageHelpers.checkAllPages(cy)
    })

    it ('Test case 2, Create a new client', function(){
        clientHelpers.createClientRequest(cy)
    })

    it ('Test case 3, Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
    })

    it('Test case 4, Create a client and delete it', function(){
        clientHelpers.createClientRequestAndDelete(cy)
    })

    it ('Test case 5, Edit first client', function(){
       clientHelpers.editFirstClient(cy)
     })

    it ('Test case 6, Edit second client', function(){
        clientHelpers.editSecondClient(cy)
      })

    })