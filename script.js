let score = 0;
let lives = 5;
let level = "Eligibility";

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");

const startScreen = document.getElementById("start-screen");
const quizArea = document.getElementById("quiz-area");
const scoreboard = document.getElementById("scoreboard");

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const levelDisplay = document.getElementById("level");
const welcomeMsg = document.getElementById("welcome-msg");

// Start Quiz
startBtn.addEventListener("click", () => {
  const playerName = document.getElementById("player-name").value.trim();
  if (playerName === "") {
    alert("Please enter your name before starting!");
    return;
  }

  startScreen.style.display = "none";
  quizArea.style.display = "block";
  scoreboard.style.display = "block";

  welcomeMsg.textContent = `Welcome, ${playerName}! Let's begin your journey.`;
  updateScoreboard();
});

// Restart Quiz
restartBtn.addEventListener("click", () => {
  score = 0;
  lives = 5;
  level = "Eligibility";
  document.getElementById("player-name").value = "";
  startScreen.style.display = "block";
  quizArea.style.display = "none";
  scoreboard.style.display = "none";
  updateScoreboard();
});

// Next Question (placeholder logic)
nextBtn.addEventListener("click", () => {
  score += 10;
  lives--;
  if (lives <= 0) {
    alert("Game Over! Final Score: " + score);
    restartGame();
  } else {
    updateScoreboard();
  }
});

function updateScoreboard() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  levelDisplay.textContent = level;
}

function restartGame() {
  score = 0;
  lives = 5;
  level = "Eligibility";
  document.getElementById("player-name").value = "";
  startScreen.style.display = "block";
  quizArea.style.display = "none";
  scoreboard.style.display = "none";
  updateScoreboard();
}
