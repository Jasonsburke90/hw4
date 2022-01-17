// global variables
const startButton = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const questions = [
  {
    question: "Which one of these symbols is not a javascript operator?",
    answers: ["+", "-", "**", "#", "%"],
    correct: "#",
  },
  {
    question: "String, Boolean, and Number are what type of value?",
    answers: [
      "Primitive Value",
      "Object Value",
      "Standard Value",
      "Abnormal Value",
    ],
    correct: "Primitive Value",
  },

  {
    question:
      "Which of the following are ways in which we can traverse the DOM?",
    answers: ["Class", "ID", "Tag", "CSS Selectors", "All of the above"],
    correct: "All of the above",
  },
];
let qIndex = 0;
// startgame function
function startGame() {
  // hide start button
  startButton.hidden = true;
  displayQuestions();
}

// display questions function
function displayQuestions() {
  // clear previous question/answer
  answersDiv.textContent = "";
  questionDiv.textContent = "";

  // put question into questiondiv
  questionDiv.innerHTML = questions[qIndex].question;
  // loop through answers
  questions[qIndex].answers.forEach((answer) => {
    // create answer button
    const answerBtn = document.createElement("button");
    // add answer content from const questions array
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    //  add click event listener
    answerBtn.onclick = answerClick;
    // append buttons to the answers div
    answersDiv.appendChild(answerBtn);
  });
}
// game start
startButton.addEventListener("click", startGame);
