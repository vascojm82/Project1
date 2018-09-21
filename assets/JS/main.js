$(document).ready(function () {


  var provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage();



  // $('.login').click(function(){
  //   document.getElementById('id01').style.display='block';
  //   document.getElementById('id01').style.width='auto';
  // });

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
});

function ebaySearch() {

  //var queryURL = "https://api.walmartlabs.com/v1/items?apiKey=gz923356c3mh4n2agf52q4hp&upc=035000521019";
  var queryURL = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=luisdiaz-project1-PRD-4d2df7e74-dcc5cc15&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=cat&paginationInput.entriesPerPage=3";

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
    error: function (error) {
      console.log(error);
    },
    dataType: 'jsonp',
    success: function (data) {
      console.log(data);
      //walmartcode
    },
    type: 'GET'
  });

}
//YESENIA IS GONNA WORK HERE!!
function walmartSearch() {

  //call walmart API

  // in the var data, find out where is title, price and img

   newCards(title, price, imgSrc);

}
//YESENIA END
walmartSearch();

function _cb_findItemsByKeywords(root) {
  console.log(root);
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  console.log(items);

  for (var i = 0; i < items.length; i++) {

    console.log('title: ' + items[i].title);
    console.log('price: ' + items[i].sellingStatus[0].currentPrice[0].__value__);
    console.log('image url: ' + items[i].galleryURL);

    newCards(
      items[i].title, 
      items[i].sellingStatus[0].currentPrice[0].__value__, 
      items[i].galleryURL
    );
    
  }

}

function newCards(title, price, imgSrc){
  var h5 = $('<h5 class="card-title">');
  h5.text(title);

  var p = $('<p class="price-text">');
  p.text(price);
  var img = $('<img class="card-img-top" src=' + imgSrc + '>');
  var cardBodyDiv = $('<div class="card-body">');
  cardBodyDiv.append(h5, p);
  var card = $('<div class="card">').append(img,cardBodyDiv);

  var colDiv = $('<div class="col-12 col-md-4 col-lg-3">').append(card);
  $('#items').append(colDiv);

}
