function searchItem() {

    //var queryURL = "http://api.walmartlabs.com/v1/items?apiKey=gz923356c3mh4n2agf52q4hp&upc=035000521019";
    var queryURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=luisdiaz-project1-PRD-4d2df7e74-dcc5cc15&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=cat&paginationInput.entriesPerPage=3";

    console.log(queryURL);
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).done(function (response) {
    //     console.log('LINE 20!!')
    //     console.log(response);
    // }).fail(function(error) {
    //     console.log(error);
    //   })


    $.ajax({
        url: queryURL,
        data: {
           format: 'json'
        },
        error: function(error) {
            console.log(error);
        },
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
        },
        type: 'GET'
     });

}

function _cb_findItemsByKeywords(root) {
    console.log(root);
    var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    console.log(items);
} 

$('document').ready( function(){

    searchItem();
});