const homeScreen = document.getElementById('home-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const winModal = document.getElementById('win-modal');
const cardGrid = document.getElementById('card-grid');
const gameTitle = document.getElementById('game-title');
const difficultyTopicTitle = document.getElementById('difficulty-topic-title');

let currentTopic = null;
let currentDifficulty = null;
const game = new MemoryGame(cardGrid, (moves) => showWinModal(moves));

document.querySelectorAll('.topic-card').forEach((card) => {
  attachHoverEffects(card, '.topic-emoji');
  card.addEventListener('click', () => showDifficulty(card.dataset.topic));
});

document.querySelectorAll('.difficulty-card').forEach((card) => {
  attachHoverEffects(card, '.difficulty-emoji');
  card.addEventListener('click', () => startGame(currentTopic, card.dataset.difficulty));
});

document.getElementById('difficulty-back-btn').addEventListener('click', goHome);
document.getElementById('back-btn').addEventListener('click', goToDifficulty);
document.getElementById('play-again-btn').addEventListener('click', () => {
  hideWinModal();
  startGame(currentTopic, currentDifficulty);
});
document.getElementById('home-btn').addEventListener('click', () => {
  hideWinModal();
  goHome();
});

function showScreen(screen) {
  [homeScreen, difficultyScreen, gameScreen].forEach((el) => el.classList.remove('active'));
  screen.classList.add('active');
}

function showDifficulty(topic) {
  currentTopic = topic;
  difficultyTopicTitle.textContent = TOPICS[topic].title;
  showScreen(difficultyScreen);
}

function startGame(topic, difficulty) {
  currentTopic = topic;
  currentDifficulty = difficulty;
  const diff = DIFFICULTIES[difficulty];
  gameTitle.textContent = `${TOPICS[topic].title} · ${diff.label}`;
  game.init(topic, difficulty);
  showScreen(gameScreen);
}

function goToDifficulty() {
  if (currentTopic) {
    difficultyTopicTitle.textContent = TOPICS[currentTopic].title;
    showScreen(difficultyScreen);
  } else {
    goHome();
  }
}

function goHome() {
  showScreen(homeScreen);
  currentTopic = null;
  currentDifficulty = null;
}

function showWinModal(moves) {
  document.getElementById('final-moves').textContent = moves;
  winModal.classList.remove('hidden');
}

function hideWinModal() {
  winModal.classList.add('hidden');
}
