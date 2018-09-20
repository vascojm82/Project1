$( document ).ready(function() {
  var provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage();

  firebase.auth().signInWithPopup(provider).then(function(data) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = data.credential.accessToken;
    // The signed-in user info.
    var user = data.user;
    console.log("Access Token: " + token);
    console.log("User: " + user);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    console.log("Error: " + error);
  });
});
