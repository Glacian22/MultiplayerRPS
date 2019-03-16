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
//client tracking of numPlayers, which is on firebase
var players;

//check firebase numPlayers
database.ref().once("value", function (snapshot) {
    var data = snapshot.val();
    players = data.numPlayers;
}).then (function() {
    if (players < 2){ //if there are less than 2 players
        players ++;
        database.ref().child("numPlayers").set(players);
    }
    if (players === 2){
        //start game
    }
})