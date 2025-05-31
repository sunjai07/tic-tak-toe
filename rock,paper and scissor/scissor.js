const nameScreen = document.getElementById('nameScreen');
const gameScreen = document.getElementById('gameScreen');
const playerNameInput = document.getElementById('playerNameInput');
const startBtn = document.getElementById('startBtn');
const welcomeMsg = document.getElementById('welcomeMsg');

const buttons = document.querySelectorAll('.choice-btn');
const userChoiceDisplay = document.getElementById('userChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const outcomeDisplay = document.getElementById('outcome');
const playAgainBtn = document.getElementById('playAgainBtn');

let playerName = '';

startBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if (name.length === 0) {
    alert('Please enter your name to start!');
    return;
  }
  playerName = name;
  welcomeMsg.textContent = `Hello, ${playerName}!`;
  nameScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    play(button.dataset.choice);
  });
});

playAgainBtn.addEventListener('click', () => {
  resetGame();
});

function play(userChoice) {
  // Reset outcome and hide play again button
  outcomeDisplay.textContent = '';
  playAgainBtn.classList.add('hidden');

  // Show question marks and shake animation
  userChoiceDisplay.textContent = '❔';
  computerChoiceDisplay.textContent = '❔';

  userChoiceDisplay.classList.add('shake');
  computerChoiceDisplay.classList.add('shake');

  // After animation (about 1.8s), show choices and result
  setTimeout(() => {
    userChoiceDisplay.classList.remove('shake');
    computerChoiceDisplay.classList.remove('shake');

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    userChoiceDisplay.textContent = emojiForChoice(userChoice);
    computerChoiceDisplay.textContent = emojiForChoice(computerChoice);

    const result = decideWinner(userChoice, computerChoice);
    outcomeDisplay.textContent = result;

    // Show play again button
    playAgainBtn.classList.remove('hidden');
  }, 1800);
}

function decideWinner(user, computer) {
  if (user === computer) {
    return "It's a draw!";
  }
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return `${playerName}, you win! 🎉`;
  }
  return "You lose! 😢";
}

function emojiForChoice(choice) {
  switch(choice) {
    case 'rock': return '🪨';
    case 'paper': return '📄';
    case 'scissors': return '✂️';
    default: return '❔';
  }
}

function resetGame() {
  outcomeDisplay.textContent = '';
  userChoiceDisplay.textContent = '❔';
  computerChoiceDisplay.textContent = '❔';
  playAgainBtn.classList.add('hidden');
}
