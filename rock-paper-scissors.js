const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses : 0,
  ties : 0 
};

updateScore();

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
}

function updateScore(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}

function playGame(playerMove){
  let result = '';
  let computerMove = pickComputerMove();

  if (playerMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'Tie.';
      score.ties++;
    } else if (computerMove === 'paper'){
      result = 'You lose.';
      score.losses++;
    } else if (computerMove === 'scissors'){
      result = 'You win.';
      score.wins++;
    }
  } else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You win.';
      score.wins++;
    } else if (computerMove === 'paper'){
      result = 'Tie.';
      score.ties++;
    } else if (computerMove === 'scissors'){
      result = 'You lose.';
      score.losses++;
    }
  } else if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
      result = 'You lose.';
      score.losses++;
    } else if (computerMove === 'paper'){
      result = 'You win.';
      score.wins++;
    } else if (computerMove === 'scissors'){
      result = 'Tie.';
      score.ties++;
    }
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-moves').innerHTML = `You <img src="/images/${playerMove}-emoji.png" class="move-icon"> <img src="/images/${computerMove}-emoji.png" class="move-icon"> Computer`;

  updateScore();
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  let buttonElement = document.querySelector('.js-auto-play');
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      playGame(pickComputerMove());
    }, 1000);
    isAutoPlaying = true;
    buttonElement.classList.add('stop-play');
    buttonElement.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.classList.remove('stop-play');
    buttonElement.innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-score').addEventListener('click', () => {
  confirmResetScore();      
});

document.querySelector('.js-auto-play')
 .addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', event => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    confirmResetScore();
  }

});

function confirmResetScore(){
  document.querySelector('.js-reset-confirmation')
  .innerHTML = `Are you sure you want to reset? 
    <button class="yes-reset-score js-yes-reset-score"> Yes </button>
    <button class="no-reset-score js-no-reset-score"> No </button>`;

    document.querySelector('.js-yes-reset-score').addEventListener('click', () => {
      resetScore();
      updateScore();
      document.querySelector('.js-result')
       .innerHTML = '';
       document.querySelector('.js-moves')
       .innerHTML = '';
      document.querySelector('.js-reset-confirmation')
       .innerHTML = '';
    });

    document.querySelector('.js-no-reset-score').addEventListener('click', () => {
      document.querySelector('.js-reset-confirmation')
       .innerHTML = '';
    });
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber > 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
}