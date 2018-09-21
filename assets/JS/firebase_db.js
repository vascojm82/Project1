var config = {
    apiKey: "AIzaSyDhtUruqe6PM_B3BxH38flw1uCbb9D73aI",
    authDomain: "project1-ecommerce.firebaseapp.com",
    databaseURL: "https://project1-ecommerce.firebaseio.com",
    projectId: "project1-ecommerce",
    storageBucket: "project1-ecommerce.appspot.com",
    messagingSenderId: "946289156606"
};
firebase.initializeApp(config);


var db = firebase.database().ref('project1');
