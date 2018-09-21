$( document ).ready(function() {
  
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

  searchItem();
   
  var provider = new firebase.auth.GoogleAuthProvider();

   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
   firebase.auth().useDeviceLanguage();



  // $('.login').click(function(){
  //   document.getElementById('id01').style.display='block';
  //   document.getElementById('id01').style.width='auto';
  // });

  $('.login').click(function(){
    firebase.auth().signInWithPopup(provider).then(function(data) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = data.credential.accessToken;
      // The signed-in user info.
      var user = data.user;
      console.log("User: " + JSON.stringify(user));
      console.log("Access Token: " + token);
      $('.signup').css("display", "none");
      $('.logout').css("display", "inline-block");
    }).catch(function(error) {
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

  $('.logout').click(function(){
    firebase.auth().signOut().then(function() {
      console.log("You are signed out ");
      $('.signup').css("display", "inline-block");
      $('.logout').css("display", "none");
    }).catch(function(error) {
      console.log(error);
    });
  });
});
