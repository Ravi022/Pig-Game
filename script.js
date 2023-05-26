'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Global variable of the function.
let playing;
let activePlayer;
let score;
let currentScore;
const startGame = function () {
  console.log('ravi');
  //Starting Conditions
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
startGame();

// function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing === false) return;
  //1.Generate random number on dice
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  // diceEl.classList.add('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (dice != 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
  // switch to next playerscore--0
  else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing === false) return;
  //1.Add current score to active player's score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  //2.Check if player's score is >=100
  if (score[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
  //3.Switch to next player
  else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  startGame();
});
