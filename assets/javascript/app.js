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
    var gameState;

    var myScore = 0;
    var theirScore = 0;
    var myChoice = "";
    var theirChoice = "";

    var playerID;

    //tell player they're waiting for an opponent
    $("h2").text("Waiting for another player to join");

    //check firebase numPlayers
    database.ref().once("value", function (snapshot) {
        var data = snapshot.val();
        players = data.numPlayers;
    }).then(function () {
        if (players < 2) { //if there are less than 2 players
            players++;

            //set playerID (first player or second), update server
            console.log("updating numPlayers");
            playerID = players;
            console.log("playerID: ", playerID);
            database.ref().child("numPlayers").set(players);
        } else {
            //multiple game instances not yet implemented, so if there are already 2 players, apologize to the user
            $("h2").text("Sorry, game is full");
        }
    })

    //database change listener 
    database.ref().on("child_changed", function (snapshot) {
        //if the child changed was the player count
        if (typeof snapshot.val() === "number") {
            players = snapshot.val();

            //start game if there are 2 players
            if (players === 2) {
                gameState = "running";
                console.log("gamestate: ", gameState);
                $("h2").text("Alright, opponent found! Make your choice!");
            }
        } else {
            //it was an RPS value
            //if it was your opponent's choice, store it locally

            if (snapshot.key !== "player" + playerID + "Choice") {
                console.log("opponent has chosen")
                theirChoice = snapshot.val();
                console.log("typeof theirChoice: ", typeof theirChoice);
                if (theirChoice !== "") {
                    $(".their-choice").hide();
                    $(".their-choice").text("They chose: " + theirChoice);
                }

            }

            //if both players have sent their choice to the server, evaluate
            database.ref().once("value", function (bigSnapshot) {
                var choice1 = bigSnapshot.val().player1Choice;
                var choice2 = bigSnapshot.val().player2Choice;
                if (choice1 !== "" && choice2 !== "") {
                    console.log("comparing choices")
                    comparePlayerChoices();
                }
            })

            //watch for end of round
        }
    })

    //capture image clicks
    //if string is empty, update choice
    $("img").on("click", function () {
        if (!myChoice && gameState === "running") {
            myChoice = $(this).attr("value");
            $(".my-choice").text("I chose: " + myChoice);
            database.ref().child("player" + playerID + "Choice").set(myChoice);
        }
    })


    function comparePlayerChoices() {
        //write function comparing player choices
        //reveal opponent's choice
        $(".their-choice").show();
        console.log("my choice: ", myChoice, "their choice: ", theirChoice)
        if (myChoice === theirChoice) {
            $("h2").text("It's a tie! Choose again!")
            resetChoices();
        } else if (myChoice === "scissors" && theirChoice === "paper") {
            getPoint();
        } else if (myChoice === "paper" && theirChoice === "rock") {
            getPoint();
        } else if (myChoice === "rock" && theirChoice === "scissors") {
            getPoint();
        } else {
            $("h2").text("So sad, so sad. You can do better.")
            theirScore++;
            updateScores();
            resetChoices();
            checkEnd();
        }
    }

    function checkEnd(){
        if (myScore === 3){
            $("h2").text("You win!")
        }
        if(theirScore === 3){
            $("h2").text("You lose!")
        }
    }

    function getPoint() {
        myScore++;
        resetChoices();
        updateScores();
        database.ref().child("player1Choice").set("");
        database.ref().child("player2Choice").set("");
        $("h2").text("You chose wisely!")
        checkEnd();

    }
    function updateScores() {
        $(".my-score").html("My Score: " + myScore);
        $(".their-score").html("Their Score: " + theirScore);
    }

    function resetChoices() {
        //doesn't matter which resets which, as long as they're both cleared
        database.ref().child("player1Choice").set("")
            .then(function () {
                myChoice = "";
            })
        database.ref().child("player2Choice").set("")
            .then(function () {
                theirChoice = "";
            });
    }
})