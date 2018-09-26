

var provider = new firebase.auth.GoogleAuthProvider();
var ebayList;
var walmartList;
var totalSearch = [];

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();

$('.login').click(function () {
  firebase.auth().signInWithPopup(provider).then(function (data) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = data.credential.accessToken;
    // The signed-in user info.
    var user = data.user;
    console.log("User: " + JSON.stringify(user));
    console.log("Access Token: " + token);
    $('.signup').css("display", "none");
    $('.logout').css("display", "inline-block");
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    console.log(error);
  });
});

$('.logout').click(function () {
  firebase.auth().signOut().then(function () {
    console.log("You are signed out ");
    $('.signup').css("display", "inline-block");
    $('.logout').css("display", "none");
  }).catch(function (error) {
    console.log(error);
  });
});



// EBAY API
function ebaySearch(userSearch) {

  var queryURL = "https://svcs.ebay.com/services/search/FindingService/v1"
    +"?OPERATION-NAME=findItemsByKeywords"
    +"&SERVICE-VERSION=1.0.0"
    +"&SECURITY-APPNAME=luisdiaz-project1-PRD-4d2df7e74-dcc5cc15&GLOBAL-ID=EBAY-US"
    +"&RESPONSE-DATA-FORMAT=JSON"
    +"&callback=_cb_findItemsByKeywords&REST-PAYLOAD"
    +"&keywords=" + userSearch
    +"&paginationInput.entriesPerPage=20";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    data: {
      format: 'json'
    },
    error: function (error) {
      console.log(error);
    },
    dataType: 'jsonp',
    success: function (data) {
      console.log(data);
    },
    type: 'GET'
  });

}
// EBAY RESPONSE
function _cb_findItemsByKeywords(data) {
  var items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  console.log('EBAY');
  console.log(items);
  ebayList = [];
  for (var i = 0; i < items.length; i++) {

    ebayList.push({
      name: (items[i].title + "").substring(0, 60) + " EBAY",
      price: items[i].sellingStatus[0].currentPrice[0].__value__,
      logo: "ebayLogo.png",
      img: items[i].galleryURL,
      qty : 0,
      itemId: items[i].itemId[0]
    });
  }
  checkIfAllCallssAreFinished();

}


// Waltmart API
function walmartSearch(userSearch) {

  var queryURL = "https://api.walmartlabs.com/v1/search"
    +"?apiKey=gz923356c3mh4n2agf52q4hp"
    +"&query=" + userSearch
    +"&numItems=20"
    +"&facet=on";

  console.log(queryURL);
  $.ajax({
    url: queryURL,
    data: {
      format: 'json'
    },
    error: function (error) {
      console.log(error);
    },
    dataType: 'jsonp',
    success: function (data) {

      var items = data.items;
      console.log('WALMART');
      console.log(items);
      walmartList = [];
      for (var i = 0; i < items.length; i++) {

        walmartList.push({
          name: items[i].name.substring(0, 60) + " WAL",
          price: items[i].salePrice,
          logo: "walmartLogo.png",
          img: items[i].mediumImage,
          qty : 0,
          itemId: items[i].itemId
        });
      }
      checkIfAllCallssAreFinished();
      //walmartcode
    }, type: 'GET'
  });

};

//MIX LISTS JUST FOR FUN
function unsortSearch(array) {

  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

}

//CREATE BOOTSTRAP CARDS
function newCards() {

  var cardsArray = []; 
  for (var i = 0; i < totalSearch.length; i++) {

    var h5 = $('<h5 class="card-title">').text(totalSearch[i].name);
    var p = $('<p class="price-text">').text('$' + totalSearch[i].price);
    var img = $('<img class="card-img-top" src=' + totalSearch[i].img + '>');
    var cardBodyDiv = $('<div class="card-body">');
    cardBodyDiv.append(h5, p);
    var addCartBtn = $('<a href="#" class="btn btn-primary addToCartBtn">')
      .text('Add to Cart')
      .attr('data-itemId', totalSearch[i].itemId);
    var logo = $('<img class="card-img-top companyLogo" src="assets/img/' + totalSearch[i].logo + '">');
    var qty = $('<div class="inputQty">');
    qty
      .text('Qty: ')
      .append("<input  type='number' class='qtyInput' id="+totalSearch[i].itemId+">");
        
    var card = $('<div class="card cardContent">').append(img, cardBodyDiv,qty, logo, addCartBtn);

    var colDiv = $('<div class="col-12 col-sm-6 col-md-4 col-lg-3">').append(card);
    cardsArray.push(colDiv);
  }
  return cardsArray;
}

//SEARCH BAR
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var userSearch = $('#searchInp').val();
  $('#searchInp').val('');
  $('#items').empty();
  ebayList = [];
  walmartList = [];
  var img = $('<img style="margin: auto" class="card-img-top" src="">');
  $('#items').append(img);
  ebaySearch(userSearch);
  walmartSearch(userSearch);

});


function checkIfAllCallssAreFinished(){
  if(ebayList && walmartList && ebayList.length>0 && walmartList.length>0){
    var cardsArray = [];    
    //process info
    totalSearch = ebayList.concat(walmartList);
    unsortSearch(totalSearch);
    $('#items').empty();
    cardsArray = newCards(totalSearch);
    $('#pagination-items').pagination({
      dataSource: cardsArray,
      pageSize: 8,
      ulClassName: "pagination pagination-lg justify-content-center",
      activeClassName: "active",
      callback: function(data, pagination) {
          // template method of yourself
          $("#items").html(data);
      }
  })
  }
}
