const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("eligibility-quiz");
const mainGame = document.getElementById("main-game");
const quizOptions = document.querySelectorAll(".quiz-option");
const submitQuiz = document.getElementById("submit-quiz");
const audio = document.getElementById("bg-audio");
const volumeIcon = document.getElementById("volume-icon");
const closeIcon = document.getElementById("close-icon");
const scoreDisplay = document.getElementById("score");
const questions = document.querySelectorAll(".question");
const nextIcon = document.getElementById("next-icon");

let score = 0;
let currentQuestion = 0;

// Start playing audio
audio.play();

// Start Quiz
startBtn.addEventListener("click", () => {
  switchScreen(startScreen, quizScreen);
});

// Show first question
questions[currentQuestion].classList.add("active");

// Next icon click
nextIcon.addEventListener("click", () => {
  questions[currentQuestion].classList.remove("active");
  currentQuestion++;
  if (currentQuestion < questions.length) {
    questions[currentQuestion].classList.add("active");
  } else {
    alert("Quiz finished! Check eligibility.");
    nextIcon.style.display = "none"; // hide next icon at end
  }
});

// Track answers
quizOptions.forEach(option => {
  option.addEventListener("click", () => {
    // clear previous selection
    option.parentElement.querySelectorAll(".quiz-option").forEach(btn => btn.classList.remove("selected"));
    option.classList.add("selected");

    // update score live
    score = 0;
    document.querySelectorAll(".question").forEach(q => {
      const selected = q.querySelector(".selected");
      if (selected && selected.dataset.correct === "true") {
        score++;
      }
    });
    scoreDisplay.textContent = score;
  });
});

// Submit Quiz
submitQuiz.addEventListener("click", () => {
  if (score >= 2) {
    alert(`Great job! You scored ${score}/3 and unlocked the main game.`);
    switchScreen(quizScreen, mainGame);
  } else {
    alert(`You scored ${score}/3. You need at least 2 correct to unlock. Try again!`);
  }
});

// Screen transition function
function switchScreen(hideSection, showSection) {
  hideSection.classList.add("hidden");
  showSection.classList.remove("hidden");
}

// Mute/Unmute
volumeIcon.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    volumeIcon.src = "audio-on.png";
  } else {
    audio.muted = true;
    volumeIcon.src = "audioOff.png";
  }
});

// Close button
closeIcon.addEventListener("click", () => {
  alert("Closing quiz screen...");
  startScreen.classList.add("hidden");
});
