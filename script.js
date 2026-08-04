/* ===========================
   ELEMENT REFERENCES
=========================== */

// Start screen
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const playerNameInput = document.getElementById("player-name");

// Eligibility quiz
const quizScreen = document.getElementById("eligibility-quiz");
const eligibilityQuestionsContainer = document.getElementById("eligibility-questions");
const scoreDisplay = document.getElementById("score");
const submitQuiz = document.getElementById("submit-quiz");

// Popup
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");
const popupOk = document.getElementById("popup-ok");

// Main game
const mainGame = document.getElementById("main-game");
const sectionButtons = document.querySelectorAll(".section-btn");
const quizContainer = document.getElementById("quiz-container");
const gameContent = document.getElementById("game-content");

// Audio + icons
const audio = document.getElementById("bg-audio");
const volumeIcon = document.getElementById("volume-icon");
const closeIcon = document.getElementById("close-icon");

// Question and answer Audio
const correctAudio = document.getElementById("correct-sound");
const incorrectAudio = document.getElementById("incorrect-sound");

// Game over screen
const gameOverScreen = document.getElementById("game-over-screen");
const restartBtn = document.getElementById("restart-btn");

// Floating images
const floatImages = [
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
    document.getElementById("img4"),
    document.getElementById("img5"),
    document.getElementById("img6"),
    document.getElementById("img7")
];


/* ===========================
   GLOBAL VARIABLES
=========================== */
let finalScore = 0;
let currentQuestionIndex = 0;
let currentSection = "";
let currentSectionIndex = 0;
let sectionScore = 0;


/* ===========================
   QUESTION BANKS
=========================== */

const eligibilityQuiz = [
    { q: "Salesforce is primarily a platform for…", options: ["Customer Relationship Management (CRM)", "Video Streaming", "Food Delivery"], correct: "Customer Relationship Management (CRM)" },
    { q: "Which Salesforce mascot is a bear?", options: ["Codey", "Astro", "Einstein"], correct: "Codey" },
    { q: "Trailhead is Salesforce’s…", options: ["Learning Platform", "Music App", "Cloud Storage"], correct: "Learning Platform" },
    { q: "Apex in Salesforce is…", options: ["A programming language", "A database", "A reporting tool"], correct: "A programming language" },
    { q: "SOQL is used for…", options: ["Querying Data", "UI Styling", "Automation"], correct: "Querying Data" }
];

const sectionQuizzes = {
    admin: [
        { q: "What does a Salesforce Profile control?", options: ["Permissions & Access", "UI Themes", "API Limits"], correct: "Permissions & Access" },
        { q: "Role Hierarchy affects:", options: ["Record Visibility", "Page Layouts", "Email Templates"], correct: "Record Visibility" },
        { q: "Validation Rules ensure:", options: ["Data Quality", "UI Styling", "API Security"], correct: "Data Quality" },
        { q: "A Page Layout controls:", options: ["Field Arrangement", "Database Size", "API Calls"], correct: "Field Arrangement" },
        { q: "Sharing Rules grant:", options: ["Additional Access", "Storage Increase", "New UI Themes"], correct: "Additional Access" }
    ],

    Development: [
  {
    q: "Which statement about Apex governor limits is true?",
    options: [
      "They only apply in sandbox orgs",
      "They are per-transaction limits enforced by the platform",
      "They can be disabled via org settings",
      "They only affect UI operations"
    ], correct: "They are per-transaction limits enforced by the platform" },

  {
    q: "Which SOQL clause is used to filter records returned from a query?",
    options: [
      "ORDER BY",
      "GROUP BY",
      "WHERE",
      "HAVING"
    ], correct: "WHERE" },

  {
    q: "In Apex triggers, when should you use a 'before insert' trigger?",
    options: [
      "To send outbound messages after record creation",
      "To modify or validate field values before the record is saved",
      "To access system-generated Ids of the new records",
      "To run long-running batch jobs"
    ],correct: "To modify or validate field values before the record is saved",
    
  },

  {
    q: "Which of the following is the recommended way for an LWC to call an Apex method?",
    options: [
      "Use window.fetch to call Apex directly",
      "Import the Apex method and call it via @wire or imperative call",
      "Use Visualforce remoting from the component",
      "Embed Apex code inside the component's HTML"
    ], correct: "Import the Apex method and call it via @wire or imperative call"},

  {
    q: "Which integration pattern is best when you need to expose Salesforce data to an external system in near real-time?",
    options: [
      "Batch Apex scheduled nightly",
      "Outbound Message or Platform Events / Streaming API",
      "Manual CSV export",
      "Static site hosting"
    ],
    correct: "Outbound Message or Platform Events / Streaming API"}
    
  ],

    lwc: [
        { q: "LWC stands for:", options: ["Lightning Web Components", "Local Web Cache", "Logical Web Compiler"], correct: "Lightning Web Components" },
        { q: "LWC uses which languages?", options: ["HTML, JS, CSS", "Java Only", "Python"], correct: "HTML, JS, CSS" },
        { q: "LWC data binding is:", options: ["Reactive", "Static", "Manual"], correct: "Reactive" },
        { q: "LWC communicates with Apex using:", options: ["@wire & @AuraEnabled", "Triggers", "Reports"], correct: "@wire & @AuraEnabled" },
        { q: "LWC runs on:", options: ["Browser", "Server Only", "Database"], correct: "Browser" }
    ],

    integration: [
        { q: "REST API primarily uses:", options: ["JSON", "XML Only", "CSV"], correct: "JSON" },
        { q: "SOAP API uses:", options: ["WSDL", "JSON", "CSV"], correct: "WSDL" },
        { q: "Outbound Messages send:", options: ["Data to External Systems", "UI Themes", "Reports"], correct: "Data to External Systems" },
        { q: "Named Credentials store:", options: ["Authentication Details", "Page Layouts", "Record Types"], correct: "Authentication Details" },
        { q: "Salesforce Connect integrates:", options: ["External Data", "UI Themes", "Reports"], correct: "External Data" }
    ],

    triggers: [
        { q: "Triggers execute on:", options: ["DML Events", "UI Clicks", "Reports"], correct: "DML Events" },
        { q: "Before Triggers are used to:", options: ["Validate or Modify Data", "Send Emails", "Create Dashboards"], correct: "Validate or Modify Data" },
        { q: "After Triggers are used to:", options: ["Access System-Generated Values", "Modify UI", "Change Themes"], correct: "Access System-Generated Values" },
        { q: "Recursive Trigger prevention is done using:", options: ["Static Variables", "Validation Rules", "Page Layouts"], correct: "Static Variables" },
        { q: "Trigger.new contains:", options: ["New Version of Records", "Old Version of Records", "Deleted Records"], correct: "New Version of Records" }
    ],

    apex: [
        { q: "Apex is:", options: ["A Programming Language", "A Database", "A UI Tool"], correct: "A Programming Language" },
        { q: "SOQL is used for:", options: ["Querying Data", "UI Styling", "Automation"], correct: "Querying Data" },
        { q: "Governor Limits control:", options: ["Resource Usage", "UI Themes", "Reports"], correct: "Resource Usage" },
        { q: "Batch Apex is used for:", options: ["Large Data Jobs", "UI Styling", "Small Reports"], correct: "Large Data Jobs" },
        { q: "Queueable Apex allows:", options: ["Job Chaining", "UI Customization", "Report Scheduling"], correct: "Job Chaining" }
    ]
};


/* ===========================
   POPUP SYSTEM
=========================== */
function showPopup(title, message, onOk = null) {
    popupTitle.textContent = title;
    popupMessage.textContent = message;

    popup.classList.remove("hidden");

    const newOk = popupOk.cloneNode(true);
    popupOk.parentNode.replaceChild(newOk, popupOk);
    popupOk = newOk;

    popupOk.addEventListener("click", () => {
        popup.classList.add("hidden");
        if (onOk) onOk();
    });
}


popupClose.addEventListener("click", () => popup.classList.add("hidden"));


/* ===========================
   SCREEN SWITCHING
=========================== */
function switchScreen(hideSection, showSection) {
    hideSection.classList.add("hidden");
    showSection.classList.remove("hidden");
}


/* ===========================
   START QUIZ BUTTON
=========================== */


startBtn.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();

    if (!playerName) {
        showPopup("Error", "Please enter your name to begin!");
        return;
    }

    //document.querySelector("eligibility-quiz").textContent =
    //    `Welcome, ${playerName}! Eligibility Quiz`;

    //showPopup("Welcome", `Welcome, ${playerName}! Let's start the quiz.`, () => {
    //    console.log(`ok clicked, startScreen: ${startScreen.id}, quizScreen: ${quizScreen.id}`);
    //});
    switchScreen(startScreen, quizScreen);
        loadEligibilityQuiz();
});


/* ===========================
   LOAD ELIGIBILITY QUIZ
=========================== */
function loadEligibilityQuiz() {
    eligibilityQuestionsContainer.innerHTML = "";
    finalScore = 0;
    currentQuestionIndex = 0;

    eligibilityQuiz.forEach((item, index) => {
        const block = document.createElement("div");
        block.classList.add("question");
        if (index === 0) block.classList.add("active");

        block.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${item.q}</p>
            ${item.options.map(opt => `<button class="quiz-option">${opt}</button>`).join("")}
            <button class="submit-btn">Submit Answer</button>
        `;

        eligibilityQuestionsContainer.appendChild(block);

        const options = block.querySelectorAll(".quiz-option");
        const submitBtn = block.querySelector(".submit-btn");

        options.forEach(option => {
            option.addEventListener("click", () => {
                options.forEach(btn => btn.classList.remove("selected"));
                option.classList.add("selected");
            });
        });

        submitBtn.addEventListener("click", () => {
            const selected = block.querySelector(".selected");
            if (selected && selected.textContent === item.correct) finalScore++;

            scoreDisplay.textContent = finalScore;

            block.classList.remove("active");
            currentQuestionIndex++;

            if (currentQuestionIndex < eligibilityQuiz.length) {
                eligibilityQuestionsContainer.children[currentQuestionIndex].classList.add("active");
            } else {
                finishEligibilityQuiz();
            }
        });
    });
}
//calculate eligibility score
function calculateEligibilityScore() {
    let finalScore = 0;
    const selectedOptions = document.querySelectorAll(".quiz-option.selected");

    selectedOptions.forEach(option => {
        if (option.dataset.correct === "true") {
            finalScore++;
        }
    });

    return finalScore;
}


/* ===========================
   FINISH ELIGIBILITY QUIZ
=========================== */
// finishEligibilityQuiz: switch immediately to main game and show popup (non-blocking)
function finishEligibilityQuiz() {
    console.log("Finishing quiz...");

    finalScore = calculateEligibilityScore();
    scoreDisplay.textContent = finalScore;

    // Switch to main game immediately
    switchScreen(quizScreen, mainGame);

    // Show a non-blocking popup with the result
    showPopup(`Quiz Completed! You are Eligible!`);
}

// Submit Quiz button: switch to main game right away when clicked
submitQuiz.addEventListener("click", () => {
    console.log("Submit clicked");

    const finalScore = calculateEligibilityScore();
    console.log("Score:", finalScore);

    // Update score display
    scoreDisplay.textContent = finalScore;

    // Immediately navigate to main game
    switchScreen(quizScreen, mainGame);

    // Optionally show the popup (does not block navigation)
    showPopup("Quiz Completed You are Eligible!", `Your score is ${finalScore}/${eligibilityQuiz.length}`);
});



/* ===========================
   MAIN GAME SECTION SELECTOR
=========================== */
sectionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentSection = btn.dataset.section;
        currentSectionIndex = 0;

        quizContainer.innerHTML = "";
        gameContent.textContent = "";

        loadSectionQuiz(currentSection);
    });
});


/* ===========================
   LOAD SECTION QUIZ
=========================== */
function loadSectionQuiz(section) {
    const quiz = sectionQuizzes[section];
    quizContainer.innerHTML = "";
    gameContent.textContent = `Score: 0 / ${quiz.length}`;

    let sectionScore = 0;
    let wrongAnswers = 0;
    let currentSectionIndex = 0;

    quiz.forEach((item, index) => {
        const block = document.createElement("div");
        block.classList.add("question");
        if (index === 0) block.classList.add("active");

        block.innerHTML = `
            <p><strong>${section.toUpperCase()} Q${index + 1}:</strong> ${item.q}</p>
            ${item.options.map(opt => `<button class="quiz-option">${opt}</button>`).join("")}
        `;

        quizContainer.appendChild(block);

        const options = block.querySelectorAll(".quiz-option");

        options.forEach(option => {
            option.addEventListener("click", () => {

                // Disable all options after clicking
                options.forEach(btn => btn.disabled = true);

                const isCorrect = option.textContent === item.correct;

                if (isCorrect) {
                    sectionScore++;
                    gameContent.textContent = `Score: ${sectionScore} / ${quiz.length}`;
                    playCorrect();
                    option.style.background = "#026006";
                    option.style.color = "#81d185";
                } else {
                    wrongAnswers++;
                    playWrong();
                    option.style.background = "#ed0b22";
                    option.style.color = "#e1aeae";
                }

                // GAME OVER CHECK
                if (wrongAnswers > 3) {
                    showGameOverScreen();
                    return;
                }

                // Move to next question
                setTimeout(() => {
                    quizContainer.children[currentSectionIndex].classList.remove("active");
                    currentSectionIndex++;

                    if (currentSectionIndex < quiz.length) {
                        quizContainer.children[currentSectionIndex].classList.add("active");
                    } else {
                        showSectionSubmitButton(sectionScore, quiz.length);
                    }
                }, 800);
            });
        });
    });
}



function showSectionSubmitButton(sectionScore, total) {
    quizContainer.innerHTML = `
        <h3>Section Completed!</h3>
        <p>Your Score: ${sectionScore} / ${total}</p>
        <button id="section-submit-btn">Submit Quiz</button>
    `;

    document.getElementById("section-submit-btn").addEventListener("click", () => {
        switchScreen(mainGame, mainGame); // stays in main game
        quizContainer.innerHTML = "";
        gameContent.textContent = "";
        showPopup("Success", "Section completed! Choose another section.");
    });
}


// Add ripple/highlight on click and keep existing dataset.section behavior
document.querySelectorAll('.section-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // small pulse effect
    btn.animate([
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0.98)', opacity: 0.98 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 260, easing: 'cubic-bezier(.2,.9,.3,1)' });

    // optional: temporary outline to show selection
    btn.style.boxShadow = '0 18px 40px rgba(20,20,40,0.18)';
    setTimeout(() => btn.style.boxShadow = '', 420);

    // preserve your existing behavior: set currentSection and load quiz
    const section = btn.dataset.section;
    if (section) {
      currentSection = section;
      currentSectionIndex = 0;
      quizContainer.innerHTML = '';
      gameContent.textContent = '';
      loadSectionQuiz(currentSection);
    }
  });
});

//GAME OVER SCREEN
function showGameOverScreen() {
    quizContainer.innerHTML = `
        <h2 style="color:#ff4444; text-shadow:0 0 10px red;">GAME OVER</h2>
        <p>You got more than 3 answers wrong.</p>
        <button id="restart-btn">Restart Game</button>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
        // Reset section UI
        quizContainer.innerHTML = "";
        gameContent.textContent = "";

        // Navigate back to main game screen
        switchScreen(mainGame, mainGame);

        showPopup("Restarted", "You can choose a new section now!");
    });
}

function showGameOver() {
  gameOverScreen.classList.remove("hidden");
}

//RESTART BUTTON FUNCTIONALITY
restartBtn.addEventListener("click", () => {
  gameOverScreen.classList.add("hidden");

  // reset quiz UI if needed
  // e.g. quizContainer.innerHTML = "";
  // gameContent.textContent = "";

  // navigate back to main game
  switchScreen(quizScreen, mainGameScreen);
});

/* ===========================
   AUDIO CONTROL
=========================== */
audio.play();

volumeIcon.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeIcon.src = audio.muted ? "./assets/icons/audioOff.png" : "./assets/icons/audioOn.png";
});


const correctSound = new Audio("./assets/music/Correct answer.wav");
const incorrectSound = new Audio("./assets/music/Wrong answer.wav");


// Play correct and wrong answer sounds
function playCorrect() {
    if (!audio.muted) {
        correctSound.currentTime = 0;
        correctSound.play();
    }
}

function playWrong() {
    if (!audio.muted) {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    }
}





/* ===========================
   CLOSE BUTTON
=========================== */
closeIcon.addEventListener("click", () => {
    showPopup("Exit", "Closing the game...");
    startScreen.classList.add("hidden");
});


/* ===========================
   FLOATING IMAGES
=========================== */
function randomizeImage(img) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    img.style.left = Math.random() * (screenWidth - 100) + "px";
    img.style.top = Math.random() * (screenHeight - 100) + "px";
    img.style.animationDuration = (6 + Math.random() * 6) + "s";
}

floatImages.forEach(img => randomizeImage(img));

setInterval(() => {
    floatImages.forEach(img => randomizeImage(img));
}, 12000);
