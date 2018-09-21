$( document ).ready(function() {
  console.log("I'm Alive");
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
