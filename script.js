// Events module
var EventHandlers = (function () {


    function init() {

        let startGame = true;

        if (startGame) {

            const submit = document.getElementById('submit');
            submit.addEventListener('click', function (e) {
                e.preventDefault();
                //Get users input
                const userInput = document.getElementById('input-guess');
                const guess = parseInt(userInput.value);
                DocumentEdit.proveGuess(guess);
            });
        }
    }


    return {

        init
    }

})();

// DOM module
var DocumentEdit = (function () {

    //Generate a random number between 1 and 100
    const randomNumber = parseInt((Math.random() * 100) + 1);
    let previousGuess = [];
    let numOfGuesses = 1;

    function proveGuess(guess) {
        if (isNaN(guess)) {
            // display message if user enter a non valid number Ex:(submit or letter)
            const msgFeedback = document.getElementById('msg-feedback');
            displayMessage('Var vänlig skriv in ett giltigt nummer');
            msgFeedback.style.backgroundColor = "#ed1c24";

        } else if (guess < 1) {

            // display message if user enter zero or negative number
            const msgFeedback = document.getElementById('msg-feedback');
            displayMessage('Ange ett nummer större än eller lika med 1!');
            msgFeedback.style.backgroundColor = "#ed1c24";

        } else if (guess > 100) {
            // display message if user enter a number bigger than 100.
            const msgFeedback = document.getElementById('msg-feedback');
            displayMessage('Ange ett nummer mindre än eller lika med 100!');
            msgFeedback.style.backgroundColor = "#ed1c24";

        } else {

            //save attempted guesses
            previousGuess.push(guess);
            //Check if game is finished
            if (numOfGuesses === 8 && guess !== randomNumber) {
                displayGuesses(guess);
                displayMessage(`Game Over! Rätt svar är: ${randomNumber}`);
                gameFinish();
            } else {

                //Display previous guessed numbers
                displayGuesses(guess);
                //Check guess number and display it.
                checkGuess(guess);
            }
        }
    }

    function checkGuess(guess) {

        //Display a message in the bottom of the page if user's guess is right, too high or too low
        if (guess === randomNumber) {
            const msgFeedback = document.getElementById('msg-feedback');
            displayMessage(`Rätt gissning!`);
            msgFeedback.style.backgroundColor = "#23ed1c";
            gameFinish();

        } else if (guess < randomNumber) {
            const msgFeedback = document.getElementById('msg-feedback');
            displayMessage('Gissa högre!');
            msgFeedback.style.backgroundColor = "#ed1c24";

        } else if (guess > randomNumber) {
            const msgFeedback = document.getElementById('msg-feedback');
            displayMessage('Gissa lägre!');
            msgFeedback.style.backgroundColor = "#ed1c24";
        }
    }

    function displayGuesses(guess) {

        // Display every time the rest of guesses numbers
        const userInput = document.getElementById('input-guess');
        userInput.value = '';
        const guessNumber = document.getElementById('number-of-guess');
        guessNumber.innerHTML += `${guess}  `;
        numOfGuesses++
        const remaining = document.getElementById('result');
        remaining.innerHTML = `${9 - numOfGuesses}  `;
    }

    function displayMessage(message) {
        const msgFeedback = document.getElementById('msg-feedback');
        msgFeedback.innerHTML = `<h1>${message}</h1>`
    }

    function gameFinish() {
        const userInput = document.getElementById('input-guess');
        //Clear user input
        userInput.value = '';
        // Disable user input button
        userInput.setAttribute('disabled', '');
    }


    return {
        proveGuess,
        checkGuess,
        displayGuesses,
        displayMessage,
        gameFinish
    }


})();
// This event fires when the html has been completely loaded and parsed
window.addEventListener("DOMContentLoaded", EventHandlers.init);