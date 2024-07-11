let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
 
  scoreElement()
/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
let isAutoPlaying = false;
let intervalId;

  document.querySelector('.js-autoplay')
  .addEventListener('click',() => {
     autoplay()
  });

  function autoplay () {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playermove = pickComputerMove();
        playGame(playermove);
      }, 1000);
      isAutoPlaying = true;
      document.querySelector('.js-autoplay')
      .innerHTML = 'Stop Playing';
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      document.querySelector('.js-autoplay')
      .innerHTML = 'Auto Play';
    }    
  }

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }else if (event.key === 'p') {
    playGame('paper');
  }else if (event.key === 's'){
    playGame('scissors');
  }else if (event.key === 'a') {
    autoplay()
  } else if (event.key === 'Backspace') {
    resetScore();
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  scoreElement()
  document.querySelector('.js-result')
  .innerHTML = result;
  document.querySelector('.js-moves')
  .innerHTML = ` You
<img class="move-icon" src="${playerMove}-emoji.png" alt="">
<img class="move-icon" src="${computerMove}-emoji.png" alt="">
computer`     
};
let messageHTML = '';
let messageDivElement = document.querySelector('.js-reset-message');
resetMessage = ()  => {
messageHTML = `
    Are you sure you want to reset the score?
    <button class="message-yes">Yes</button>
    <button class="message-no">No</button>
`; 
messageDivElement.innerHTML = messageHTML;
}

document.querySelector('.js-reset-button')
.addEventListener('click', resetScore = () => {
  resetMessage()
  document.querySelector('.message-yes')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    scoreElement()
    localStorage.removeItem('score');
    messageDivElement.innerHTML = '';
  })
  document.querySelector('.message-no')
  .addEventListener('click', () => {
    messageDivElement.innerHTML = '';
  })
     
})

function scoreElement () {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}