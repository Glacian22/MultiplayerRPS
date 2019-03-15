// Initialize Firebase
var config = {
    apiKey: "AIzaSyDeUlG2fljjy2n9ScsJflRLK14TuGxjTcs",
    authDomain: "rock-paper-scissors-230c5.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-230c5.firebaseio.com",
    projectId: "rock-paper-scissors-230c5",
    storageBucket: "rock-paper-scissors-230c5.appspot.com",
    messagingSenderId: "474400211700"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
