"use strict";

// Step 1: Initialize game variables
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const guessMessage = document.getElementById('guess-message');
const currentGuess = document.getElementById('current-guess');
const computerGuessElement = document.getElementById('computer-guess');
const guessHistory = document.getElementById('guess-history');

// Step 2: Initialize game state
let computerGuess = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
let attemptsLeft = 3;
let playerGuesses = [];

// Step 3: Event listener for submitting a guess
submitBtn.addEventListener('click', function() {
    const playerGuess = parseInt(guessInput.value); // Get the player's guess from input
    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
        guessMessage.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    // Add the guess to history
    playerGuesses.push(playerGuess);
    guessHistory.textContent = playerGuesses.join(', '); // Display the history of guesses

    // Update the current guess displayed
    currentGuess.textContent = playerGuess;

    // Compare the player's guess with the computer's guess
    if (playerGuess === computerGuess) {
        guessMessage.textContent = 'You guessed it! You win!';
        endGame(true); // End the game with a win
    } else {
        attemptsLeft--; // Decrease the number of attempts left

        if (attemptsLeft === 0) {
            guessMessage.textContent = `Game over! The correct number was ${computerGuess}.`;
            endGame(false); // End the game with a loss
        } else {
            // Provide feedback if the guess is too high or too low
            guessMessage.textContent = playerGuess < computerGuess ? 'Too low!' : 'Too high!';
        }
    }

    // Disable the submit button after the guess
    if (attemptsLeft === 0 || playerGuess === computerGuess) {
        submitBtn.disabled = true;
    }
});

// Function to end the game
function endGame(isWin) {
    submitBtn.disabled = true; // Disable submit button
    restartBtn.disabled = false; // Enable restart button
    computerGuessElement.textContent = computerGuess; // Reveal the correct guess
}

// Step 4: Event listener for restarting the game
restartBtn.addEventListener('click', function() {
    // Reset game state
    computerGuess = Math.floor(Math.random() * 100) + 1; // New random number
    attemptsLeft = 3;
    playerGuesses = [];

    // Update UI
    guessMessage.textContent = '';
    currentGuess.textContent = '';
    computerGuessElement.textContent = '';
    guessHistory.textContent = '';

    // Enable submit button and disable restart button
    submitBtn.disabled = false;
    restartBtn.disabled = true;
});

// Function to generate a random number
function generateComputerGuess() {
    return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
}

// Function to start the game
function startGame() {
    computerGuess = generateComputerGuess(); // Generate a random number at the start of the game
    playerGuesses = []; // Clear previous guesses
    attemptsLeft = 3; // Reset attempts
    guessMessage.textContent = ''; // Clear the message
    guessHistory.textContent = ''; // Clear guess history
    currentGuess.textContent = ''; // Clear current guess
    computerGuessElement.textContent = ''; // Clear computer guess
    submitBtn.disabled = false; // Enable submit button
    restartBtn.disabled = true; // Disable restart button
}

// Start the game when the page loads
startGame();
