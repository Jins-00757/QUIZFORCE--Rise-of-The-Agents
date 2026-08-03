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

// Floating images
const floatImages = [
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
    document.getElementById("img4"),
    document.getElementById("img5"),
    document.getElementById("img6")
];


/* ===========================
   GLOBAL VARIABLES
=========================== */
let score = 0;
let currentQuestionIndex = 0;
let currentSection = "";
let currentSectionIndex = 0;


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

    popupOk.onclick = () => {
        popup.classList.add("hidden");
        if (onOk) onOk();
    }
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

    document.querySelector("#eligibility-title").textContent =
        `Welcome, ${playerName}! Eligibility Quiz`;

    showPopup("Welcome", `Welcome, ${playerName}! Let's start the quiz.`, () => {
        switchScreen(startScreen, quizScreen);
        loadEligibilityQuiz();
    });
});


/* ===========================
   LOAD ELIGIBILITY QUIZ
=========================== */
function loadEligibilityQuiz() {
    eligibilityQuestionsContainer.innerHTML = "";
    score = 0;
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
            if (selected && selected.textContent === item.correct) score++;

            scoreDisplay.textContent = score;

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


/* ===========================
   FINISH ELIGIBILITY QUIZ
=========================== */
function finishEligibilityQuiz() {
    if (score >= 3) {
        showPopup(
            "Quiz Passed",
            `Great job! You scored ${score}/5 and unlocked the Main Game.`,
            () => switchScreen(quizScreen, mainGame)
        );
    } else {
        showPopup(
            "Quiz Failed",
            `You scored ${score}/5. You need at least 3 correct to unlock the Main Game.`
        );
    }
}


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

                // Score update
                if (option.textContent === item.correct) {
                    sectionScore++;
                    gameContent.textContent = `Score: ${sectionScore} / ${quiz.length}`;
                    option.style.background = "#c8e6c9";
                } else {
                    option.style.background = "#ffcdd2";
                }

                // Move to next question
                setTimeout(() => {
                    block.classList.remove("active");
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


function showSectionSubmitButton(score, total) {
    quizContainer.innerHTML = `
        <h3>Section Completed!</h3>
        <p>Your Score: ${score} / ${total}</p>
        <button id="section-submit-btn">Submit</button>
    `;

    document.getElementById("section-submit-btn").addEventListener("click", () => {
        switchScreen(mainGame, mainGame); // stays in main game
        quizContainer.innerHTML = "";
        gameContent.textContent = "";
        showPopup("Success", "Section completed! Choose another section.");
    });
}



/* ===========================
   AUDIO CONTROL
=========================== */
audio.play();

volumeIcon.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeIcon.src = audio.muted ? "./icons/audioOff.png" : "./icons/audioOn.png";
});


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
