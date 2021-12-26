"use strict";

//NOTE Selecting element
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0");
const score1EL = document.querySelector("#score--1");
const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//NOTE Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //hide dice at starting
  diceEL.classList.add("hidden");

  // change background to default
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");

  player0EL.classList.remove("player--looser");
  player1EL.classList.remove("player--looser");

  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");

  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");

  // main score = 0
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  // current score = 0
  current0EL.textContent = 0;
  current1EL.textContent = 0;
};
init();

//NOTE Switch player
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;

  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

//NOTE Rolling dice
btnRoll.addEventListener("click", () => {
  if (playing) {
    // Generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `img/dice-${dice}.png`;

    // Add current score
    if (dice !== 1) {
      currentScore += dice;  //currentScore = currentScore + dice
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }

    // If dice = 1, switch to next player
    else {
      switchPlayer();
    }
  }
});

//NOTE Hold score
btnHold.addEventListener("click", () => {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 30,
    if (scores[activePlayer] >= 30) {
      // Finish the game
      playing = false;
      diceEL.classList.add("hidden");
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");

      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      player0EL.classList.add("player--looser");
      player1EL.classList.add("player--looser");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--looser");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//NOTE Reload game
btnNew.addEventListener("click", init);