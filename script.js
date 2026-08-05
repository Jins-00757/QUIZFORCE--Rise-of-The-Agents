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

let popupOk = document.getElementById("popup-ok");

// Main game
const mainGame = document.getElementById("main-game");
const sectionButtons = document.querySelectorAll(".section-btn");
const quizContainer = document.getElementById("quiz-container");
const gameContent = document.getElementById("game-content");

//info popup
const infoIcon = document.getElementById("info-icon");
const rulesPopup = document.getElementById("rules-popup");
const rulesClose = document.getElementById("rules-close");

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
  document.getElementById("img7"),
];

/* ===========================
   GLOBAL VARIABLES
=========================== */
let finalScore = 0;
let eligibilityScore = 0;
let eligibilityWrongAnswers = 0;
let currentQuestionIndex = 0;
let currentSection = "";
let currentSectionIndex = 0;
let sectionScore = 0;
let timer;
let timeLeft = 20; // seconds per question




//===========================
// RULES POPUP
//===========================

infoIcon.addEventListener("click", () => {
    rulesPopup.style.display = "flex";
});

rulesClose.addEventListener("click", () => {
    rulesPopup.style.display = "none";
});


/* ===========================
   QUESTION BANKS
=========================== */

const eligibilityQuiz = [
  {
    q: "Salesforce is primarily a platform for…",
    options: [
      "Customer Relationship Management (CRM)",
      "Video Streaming",
      "Food Delivery",
    ],
    correct: "Customer Relationship Management (CRM)",
  },
  {
    q: "Which Salesforce mascot is a bear?",
    options: ["Astro", "Codey", "Einstein"],
    correct: "Codey",
  },
  {
    q: "Trailhead is Salesforce’s…",
    options: ["Music App", "Learning Platform", "Cloud Storage"],
    correct: "Learning Platform",
  },
  {
    q: "Apex in Salesforce is…",
    options: ["A programming language", "A database", "A reporting tool"],
    correct: "A programming language",
  },
  {
    q: "SOQL is used for…",
    options: ["Querying Data", "UI Styling", "Automation"],
    correct: "Querying Data",
  },
  {
  q: "What is Salesforce primarily used for?",
options: [
"Video Editing",
"Operating System Management",
"Customer Relationship Management",
"Database Hardware Setup"
],
correct: "Customer Relationship Management"
},
{
q: "Which Salesforce edition is commonly used by small businesses?",
options: [
"Enterprise Edition",
"Unlimited Edition",
"Professional Edition",
"Developer Edition"
],
correct: "Professional Edition"
},
{
q: "What is an object in Salesforce?",
options: [
"A table that stores data",
"A type of dashboard",
"A workflow rule",
"A permission setting"
],
correct: "A table that stores data"
},
{
q: "Which Salesforce feature is used to automate simple business processes?",
options: [
"Validation Rules",
"Workflow Rules",
"Reports",
"Page Layouts"
],
correct: "Workflow Rules"
},
{
q: "What is a record in Salesforce?",
options: [
"A row of data in an object",
"A type of dashboard",
"A permission set",
"A sandbox environment"
],
correct: "A row of data in an object"
},
{
q: "Which tool is used to generate data insights in Salesforce?",
options: [
"Profiles",
"Page Layouts",
"Record Types",
"Reports"
],
correct: "Reports"
},
{
q: "What does a Salesforce dashboard display?",
options: [
"Visual summaries of reports",
"Code execution logs",
"User permissions",
"Workflow automation steps"
],
correct: "Visual summaries of reports"
},
{
q: "Which Salesforce feature controls what a user can see?",
options: [
"Dashboards",
"Reports",
"Profiles",
"Objects"
],
correct: "Profiles"
},
{
q: "What is the App Launcher used for?",
options: [
"Accessing apps and tabs",
"Running Apex code",
"Managing API integrations",
"Creating triggers"
],
correct: "Accessing apps and tabs"
},
{
q: "What is a sandbox in Salesforce?",
options: [
"A testing environment",
"A reporting tool",
"A permission set",
"A workflow automation tool"
],
correct: "A testing environment"
}


];

const sectionQuizzes = {
  admin: [
    {
      q: "What does a Salesforce Profile control?",
      options: ["Permissions & Access", "UI Themes", "API Limits"],
      correct: "Permissions & Access",
    },
    {
      q: "Role Hierarchy affects:",
      options: ["Record Visibility", "Page Layouts", "Email Templates"],
      correct: "Record Visibility",
    },
    {
      q: "Validation Rules ensure:",
      options: ["Data Quality", "UI Styling", "API Security"],
      correct: "Data Quality",
    },
    {
      q: "A Page Layout controls:",
      options: ["Field Arrangement", "Database Size", "API Calls"],
      correct: "Field Arrangement",
    },
    {
      q: "Sharing Rules grant:",
      options: ["Additional Access", "Storage Increase", "New UI Themes"],
      correct: "Additional Access",
    },
    {
q: "What happens if a user loses access to a field used inside a validation rule?",
options: [
"Validation rule still fires",
"Validation rule stops firing",
"Record saves without validation",
"User receives insufficient privileges error"
],
correct: "Validation rule still fires"
},
{
q: "Which feature ensures field-level security is respected even when using automation?",
options: [
"Page Layouts",
"Profiles",
"Permission Sets",
"With Sharing Rules"
],
correct: "Permission Sets"
},
{
q: "What is the maximum number of active assignment rules allowed per object?",
options: ["1", "5", "10", "Unlimited"],
correct: "1"
},
{
q: "Which metadata type cannot be deployed using change sets?",
options: [
"Standard Value Sets",
"Custom Metadata Types",
"Profiles",
"Flows"
],
correct: "Standard Value Sets"
},
{
q: "What is the most reliable way to enforce data quality across all interfaces?",
options: [
"Page Layout Required Fields",
"Validation Rules",
"Field-Level Security",
"Record Types"
],
correct: "Validation Rules"
}
  ],

  Development: [
    {
      q: "Which statement about Apex governor limits is true?",
      options: [
        "They only apply in sandbox orgs",
        "They are per-transaction limits enforced by the platform",
        "They can be disabled via org settings",
        "They only affect UI operations",
      ],
      correct: "They are per-transaction limits enforced by the platform",
    },

    {
      q: "Which SOQL clause is used to filter records returned from a query?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
      correct: "WHERE",
    },

    {
      q: "In Apex triggers, when should you use a 'before insert' trigger?",
      options: [
        "To send outbound messages after record creation",
        "To modify or validate field values before the record is saved",
        "To access system-generated Ids of the new records",
        "To run long-running batch jobs",
      ],
      correct: "To modify or validate field values before the record is saved",
    },

    {
      q: "Which of the following is the recommended way for an LWC to call an Apex method?",
      options: [
        "Use window.fetch to call Apex directly",
        "Import the Apex method and call it via @wire or imperative call",
        "Use Visualforce remoting from the component",
        "Embed Apex code inside the component's HTML",
      ],
      correct:
        "Import the Apex method and call it via @wire or imperative call",
    },

    {
      q: "Which integration pattern is best when you need to expose Salesforce data to an external system in near real-time?",
      options: [
        "Batch Apex scheduled nightly",
        "Outbound Message or Platform Events / Streaming API",
        "Manual CSV export",
        "Static site hosting",
      ],
      correct: "Outbound Message or Platform Events / Streaming API",
    },
    {
q: "Which deployment tool supports rollback on failure?",
options: [
"Change Sets",
"Ant Migration Tool",
"Salesforce CLI",
"Workbench"
],
correct: "Salesforce CLI"
},
{
q: "Which metadata API format is required for source-driven development?",
options: [
"Metadata API",
"Tooling API",
"SFDX Source Format",
"SOAP API"
],
correct: "SFDX Source Format"
},
{
q: "Which feature allows tracking changes to Apex classes over time?",
options: [
"Debug Logs",
"Version Control (Git)",
"Setup Audit Trail",
"Deployment History"
],
correct: "Version Control (Git)"
},
{
q: "Which API is best for retrieving large volumes of records efficiently?",
options: [
"REST API",
"SOAP API",
"Bulk API",
"Tooling API"
],
correct: "Bulk API"
},
{
q: "Which deployment method supports partial deployments?",
options: [
"Change Sets",
"Metadata API",
"Salesforce CLI",
"Workbench"
],
correct: "Metadata API"
}
  ],

  lwc: [
    {
      q: "LWC stands for:",
      options: [
        "Lightning Web Components",
        "Local Web Cache",
        "Logical Web Compiler",
      ],
      correct: "Lightning Web Components",
    },
    {
      q: "LWC uses which languages?",
      options: ["HTML, JS, CSS", "Java Only", "Python"],
      correct: "HTML, JS, CSS",
    },
    {
      q: "LWC data binding is:",
      options: ["Reactive", "Static", "Manual"],
      correct: "Reactive",
    },
    {
      q: "LWC communicates with Apex using:",
      options: ["@wire & @AuraEnabled", "Triggers", "Reports"],
      correct: "@wire & @AuraEnabled",
    },
    {
      q: "LWC runs on:",
      options: ["Browser", "Server Only", "Database"],
      correct: "Browser",
    },
    {
q: "Which LWC lifecycle hook is guaranteed to run after every render?",
options: [
"connectedCallback",
"renderedCallback",
"disconnectedCallback",
"constructor"
],
correct: "renderedCallback"
},
{
q: "Which decorator ensures a property is reactive and passed from parent to child?",
options: ["@track", "@wire", "@api", "@readonly"],
correct: "@api"
},
{
q: "What is the correct way to call an Apex method imperatively?",
options: [
"@wire(method)",
"method.invoke()",
"methodName({param:value})",
"Apex.call(method)"
],
correct: "methodName({param:value})"
},
{
q: "Which LWC feature prevents DOM re-rendering for unchanged values?",
options: [
"Reactive Proxy",
"Shadow DOM",
"Lightning Locker",
"Virtual DOM"
],
correct: "Reactive Proxy"
},
{
q: "Which module is required to publish LMS messages?",
options: [
"lightning/messageService",
"lightning/pubsub",
"uiRecordApi",
"lightning/navigation"
],
correct: "lightning/messageService"
}
  ],

  integration: [
    {
      q: "REST API primarily uses:",
      options: ["JSON", "XML Only", "CSV"],
      correct: "JSON",
    },
    { q: "SOAP API uses:", options: ["WSDL", "JSON", "CSV"], correct: "WSDL" },
    {
      q: "Outbound Messages send:",
      options: ["Data to External Systems", "UI Themes", "Reports"],
      correct: "Data to External Systems",
    },
    {
      q: "Named Credentials store:",
      options: ["Authentication Details", "Page Layouts", "Record Types"],
      correct: "Authentication Details",
    },
    {
      q: "Salesforce Connect integrates:",
      options: ["External Data", "UI Themes", "Reports"],
      correct: "External Data",
    },
    {
q: "Which integration pattern is best for updating Salesforce when an external system sends frequent updates?",
options: [
"Request and Reply",
"Fire and Forget",
"Batch Data Synchronization",
"Remote Call-In"
],
correct: "Remote Call-In"
},
{
q: "Which protocol does Salesforce use for outbound messages?",
options: ["SOAP", "REST", "GraphQL", "gRPC"],
correct: "SOAP"
},
{
q: "Which API supports composite requests?",
options: [
"SOAP API",
"REST API",
"Bulk API",
"Streaming API"
],
correct: "REST API"
},
{
q: "Which integration tool is best for orchestrating multi-system workflows?",
options: [
"Outbound Messages",
"Platform Events",
"MuleSoft",
"Change Data Capture"
],
correct: "MuleSoft"
},
{
q: "Which feature allows near real-time event-driven integration?",
options: [
"Bulk API",
"Platform Events",
"Metadata API",
"Tooling API"
],
correct: "Platform Events"
}
  ],

  triggers: [
    {
      q: "Triggers execute on:",
      options: ["DML Events", "UI Clicks", "Reports"],
      correct: "DML Events",
    },
    {
      q: "Before Triggers are used to:",
      options: ["Validate or Modify Data", "Send Emails", "Create Dashboards"],
      correct: "Validate or Modify Data",
    },
    {
      q: "After Triggers are used to:",
      options: ["Access System-Generated Values", "Modify UI", "Change Themes"],
      correct: "Access System-Generated Values",
    },
    {
      q: "Recursive Trigger prevention is done using:",
      options: ["Static Variables", "Validation Rules", "Page Layouts"],
      correct: "Static Variables",
    },
    {
      q: "Trigger.new contains:",
      options: [
        "New Version of Records",
        "Old Version of Records",
        "Deleted Records",
      ],
      correct: "New Version of Records",
    },
    {
q: "Which trigger context is best for enforcing complex validation logic?",
options: [
"Before Insert",
"After Insert",
"After Update",
"Before Delete"
],
correct: "Before Insert"
},
{
q: "Which pattern prevents recursion in triggers?",
options: [
"Static Boolean Flags",
"Trigger.new",
"Trigger.oldMap",
"SOQL Limits"
],
correct: "Static Boolean Flags"
},
{
q: "Which trigger event cannot modify Trigger.new?",
options: [
"Before Update",
"Before Insert",
"After Insert",
"Before Delete"
],
correct: "After Insert"
},
{
q: "What is the best practice for handling multiple objects in triggers?",
options: [
"Multiple triggers per object",
"Single trigger per object",
"Inline logic",
"Workflow rules"
],
correct: "Single trigger per object"
},
{
q: "Which feature allows triggers to scale for large data volumes?",
options: [
"Future Methods",
"Batch Apex",
"Trigger Framework",
"Platform Events"
],
correct: "Trigger Framework"
}
  ],

  apex: [
    {
      q: "Apex is:",
      options: ["A Programming Language", "A Database", "A UI Tool"],
      correct: "A Programming Language",
    },
    {
      q: "SOQL is used for:",
      options: ["Querying Data", "UI Styling", "Automation"],
      correct: "Querying Data",
    },
    {
      q: "Governor Limits control:",
      options: ["Resource Usage", "UI Themes", "Reports"],
      correct: "Resource Usage",
    },
    {
      q: "Batch Apex is used for:",
      options: ["Large Data Jobs", "UI Styling", "Small Reports"],
      correct: "Large Data Jobs",
    },
    {
      q: "Queueable Apex allows:",
      options: ["Job Chaining", "UI Customization", "Report Scheduling"],
      correct: "Job Chaining",
    },
    {
q: "Which Apex feature allows parallel asynchronous processing?",
options: [
"Future Methods",
"Queueable Apex",
"Batch Apex",
"Scheduled Apex"
],
correct: "Queueable Apex"
},
{
q: "Which governor limit is shared across all concurrent Apex executions?",
options: [
"CPU Time",
"SOQL Queries",
"Heap Size",
"Concurrent Async Jobs"
],
correct: "Concurrent Async Jobs"
},
{
q: "Which Apex feature supports chaining jobs?",
options: [
"Batch Apex",
"Queueable Apex",
"Future Methods",
"Scheduled Apex"
],
correct: "Queueable Apex"
},
{
q: "Which method ensures safe DML operations inside loops?",
options: [
"Database.insert",
"Database.upsert",
"Database.savepoint",
"Bulkification"
],
correct: "Bulkification"
},
{
q: "Which Apex feature allows querying metadata?",
options: [
"Tooling API",
"Metadata API",
"Schema Namespace",
"Describe Calls"
],
correct: "Describe Calls"
}
  ],

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
  popupOk = newOk; // works now that popupOk is declared with `let`

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

  switchScreen(startScreen, quizScreen);
  loadEligibilityQuiz();
});

/* ===========================
   LOAD ELIGIBILITY QUIZ
=========================== */

function loadEligibilityQuiz() {
  startQuestionTimer();

    // FULL RESET
    eligibilityQuestionsContainer.innerHTML = "";
    eligibilityScore = 0;
    eligibilityWrongAnswers = 0;
    currentQuestionIndex = 0;
    scoreDisplay.textContent = eligibilityScore; // FIX: reset the visible score too

    // Build quiz once
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

        // Select option
        options.forEach(option => {
            option.addEventListener("click", () => {
                options.forEach(btn => btn.classList.remove("selected"));
                option.classList.add("selected");
            });
        });

        // Submit answer
        submitBtn.addEventListener("click", () => {
            const selected = block.querySelector(".selected");

            if (selected && selected.textContent === item.correct) {
                eligibilityScore++;
                playCorrect();
          selected.style.background = "#026006";
          selected.style.color = "#81d185";
            } else {
              playWrong();
          selected.style.background = "#ed0b22";
          selected.style.color = "#e1aeae";
                eligibilityWrongAnswers++;
            }

            // Wrong answer limit check
            if (eligibilityWrongAnswers > 4) {
                showPopup(
                    "Eligibility Quiz Failed",
                    "You have exceeded the maximum number of wrong answers. Please try again.",
                    () => restartEligibilityQuiz() // FIX: use the onOk callback instead of
                                                    // manually re-cloning the button here
                );
                return;
            }

            scoreDisplay.textContent = eligibilityScore;

            // Move to next question
            clearInterval(timer);
            moveToNextEligibilityQuestion();


            if (currentQuestionIndex < eligibilityQuiz.length) {
                eligibilityQuestionsContainer.children[currentQuestionIndex].classList.add("active");
            } else {
                finishEligibilityQuiz();
            }
        });
    });
}

function startQuestionTimer() {
    clearInterval(timer);
    timeLeft = 20; // reset timer for each question
    document.getElementById("timer-value").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-value").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);

            // Auto mark wrong answer
            eligibilityWrongAnswers++;

            // Check wrong limit
            if (eligibilityWrongAnswers > 4) {
                showPopup("Eligibility Quiz Failed", "Time's up too many times! Restarting quiz.");
                
                popupOk.replaceWith(popupOk.cloneNode(true));
                const newPopupOk = document.querySelector("#popup-ok");

                newPopupOk.addEventListener("click", () => {
                    restartEligibilityQuiz();
                });

                return;
            }

            // Move to next question automatically
            moveToNextEligibilityQuestion();
        }
    }, 1000);
}

function moveToNextEligibilityQuestion() {
    const blocks = eligibilityQuestionsContainer.querySelectorAll(".question");

    blocks[currentQuestionIndex].classList.remove("active");
    currentQuestionIndex++;

    if (currentQuestionIndex < eligibilityQuiz.length) {
        blocks[currentQuestionIndex].classList.add("active");
        startQuestionTimer(); // restart timer for next question
    } else {
        finishEligibilityQuiz();
    }
}


//confetti effect
function launchConfetti() {
    const neonColors = ["#00eaff", "#ff00c8", "#00ff6a", "#ffea00"];

    confetti({
        particleCount: 200,
        spread: 100,
        startVelocity: 50,
        colors: neonColors,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 80,
            startVelocity: 45,
            colors: neonColors,
            origin: { y: 0.4 }
        });
    }, 350);
}


/* ===========================
   FINISH ELIGIBILITY QUIZ
=========================== */

function finishEligibilityQuiz() {
    scoreDisplay.textContent = eligibilityScore;
    
    switchScreen(quizScreen, mainGame);
    launchConfetti();

    
    showPopup(
        "Quiz Completed!",
        `You are Eligible! Your score is ${eligibilityScore}/${eligibilityQuiz.length}`
    );
}

/* ===========================
   RESTART ELIGIBILITY QUIZ
=========================== */

function restartEligibilityQuiz() {
    eligibilityScore = 0;
    eligibilityWrongAnswers = 0;
    currentQuestionIndex = 0;

    switchScreen(quizScreen, startScreen);

    // FULL CLEAN RELOAD
    loadEligibilityQuiz();
}

/* ===========================
   MAIN GAME SECTION SELECTOR
=========================== */
// Add click event listeners to section buttons
sectionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // small pulse effect
    btn.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0.98)", opacity: 0.98 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 260, easing: "cubic-bezier(.2,.9,.3,1)" },
    );

    btn.style.boxShadow = "0 18px 40px rgba(20,20,40,0.18)";
    setTimeout(() => (btn.style.boxShadow = ""), 420);

    const section = btn.dataset.section;
    if (!section) return;

    currentSection = section;
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
            ${item.options.map((opt) => `<button class="quiz-option">${opt}</button>`).join("")}
        `;

    quizContainer.appendChild(block);

    const options = block.querySelectorAll(".quiz-option");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        // Disable all options after clicking
        options.forEach((btn) => (btn.disabled = true));

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
          quizContainer.children[currentSectionIndex].classList.remove(
            "active",
          );
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

  document
    .getElementById("section-submit-btn")
    .addEventListener("click", () => {
      quizContainer.innerHTML = "";
      gameContent.textContent = "";
      launchConfetti();
      showPopup("Success", "Section completed! Choose another section.");
    });
}

//GAME OVER SCREEN
function showGameOverScreen() {
  quizContainer.innerHTML = `
        <h2 style="color:#ff4444; text-shadow:0 0 10px red;">GAME OVER</h2>
        <p>You got more than 3 answers wrong.</p>
        <button id="restart-btn-inline">Restart Game</button>
    `;

  document.getElementById("restart-btn-inline").addEventListener("click", () => {
    quizContainer.innerHTML = "";
    gameContent.textContent = "";
  showPopup("Restarted", "You can choose a new section now!");
  });
}

/* ===========================
   AUDIO CONTROL
=========================== */


let isMuted = false;

volumeIcon.addEventListener("click", () => {
    isMuted = !isMuted;
 
    if (isMuted) {
        volumeIcon.textContent = "🔇";
        volumeIcon.classList.add("muted");
        audio.muted = true;
        // mute your game audio here
    } else {
        volumeIcon.textContent = "🔊";
        volumeIcon.classList.remove("muted");
        audio.muted = false;
        audio.play();
        // unmute your game audio here
    }
   
});

// Play correct and wrong answer sounds
function playCorrect() {
  if (!audio.muted) {
    correctAudio.currentTime = 0;
    correctAudio.play();
  }
}

function playWrong() {
  if (!audio.muted) {
    incorrectAudio.currentTime = 0;
    incorrectAudio.play();
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
  img.style.animationDuration = 6 + Math.random() * 6 + "s";
}

floatImages.forEach((img) => randomizeImage(img));

setInterval(() => {
  floatImages.forEach((img) => randomizeImage(img));
}, 12000);

