$(document).ready(function () {
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().useDeviceLanguage();

    $('.login').click(function () {
        firebase.auth().signInWithPopup(provider).then(function (data) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = data.credential.accessToken;
            // The signed-in user info.
            user = data.user;
            userId = user.uid;
            console.log("User: " + JSON.stringify(user));
            console.log("Access Token: " + token);
            console.log(user);
            console.log(userId);
            $('.signup').css("display", "none");
            $('.logout').css("display", "inline-block");
            $('#tableBody').empty();

            // db.ref(userId).once("value", function (snapshot) {
            //     console.log(snapshot.val());
            //     shoppingCart(snapshot);
            // }, function (error) {
            //     console.log(error);
            // });

            addChild();


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
            $('#tableBody').empty();
        }).catch(function (error) {
            console.log(error);
        });
    });
});
