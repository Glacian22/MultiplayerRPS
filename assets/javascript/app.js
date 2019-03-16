$(document).ready(function () {
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

    //tell player they're waiting for an opponent
    $("h2").text("Waiting for another player to join");

    //check firebase numPlayers
    database.ref().once("value", function (snapshot) {
        var data = snapshot.val();
        players = data.numPlayers;
    }).then(function () {
        if (players < 2) { //if there are less than 2 players
            players++;
            database.ref().child("numPlayers").set(players);
        }
    })

    //database listener to check for numPlayers = 2, to start game, and compare RPS values during gameplay
    database.ref().on("child_changed", function (snapshot) {
        console.log("child changed triggered");
        var data = snapshot.val();

    })

})