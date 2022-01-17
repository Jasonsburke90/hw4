// global variables
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const resetButton = document.getElementById("resetbtn");
const questionAnswerSection = document.getElementById("questionanswersection");
const instructionsDiv = document.getElementById("instructions");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const highScoreList = document.getElementById("highscorelistid");
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

  {
    question: "What method can you use to merge multiple arrays?",
    answers: ["Merge", "Concat", "Push", "Filter", "All of the Above"],
    correct: "Concat",
  },
];

var highScores = [];

let qIndex = 0;
let timerCount = 30;
let isWin = false;

// functions

// initialize function
function init() {
  // hide restart button
  restartButton.hidden = true;
  // hide timer
  timer.hidden = true;
  //   access high scores
  const storedHighScores = JSON.parse(localStorage.getItem("playerHighScore"));
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  showScores();
}

// startgame function
function startGame() {
  // hide start button
  startButton.hidden = true;
  // hide instructions
  instructionsDiv.hidden = true;
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
    const answerButton = document.createElement("button");
    // add answer content from const questions array
    answerButton.textContent = answer;
    answerButton.setAttribute("value", answer);
    //  add click event listener
    answerButton.onclick = answerClick;
    // append buttons to the answers div
    answersDiv.appendChild(answerButton);
  });
}

// click event listener function
function answerClick() {
  // define variable for answer user chose
  let clickedAnswer = this.value;
  // verify to see answer is correct
  if (clickedAnswer === questions[qIndex].correct) {
    // alert user they got the right answer and add time
    alert("You got the right answer! +5 Seconds to your time!");
    timerCount += 5;
    nextQuestion();
  } else {
    //alert user they got the the answer wrong and remove time from timer
    alert("You got the wrong answer!  -5 Seconds to your time!");
    timerCount -= 5;
  }
}
// next question function
function nextQuestion() {
  qIndex++;
  if (questions.length > qIndex) {
    displayQuestions();
    // if no further questions end game
  } else {
    winGame();
  }
}
// win game function
function winGame() {
  isWin = true;
}
function startTimer() {
  // starts the game
  startGame();
  // shows timerdiv
  timer.hidden = false;
  // sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // win condition confirmation
      if (isWin && timerCount > 0) {
        alert(`You win!  You had ${timerCount} seconds remaining!`);
        // prompts player to provide name
        let playerName = prompt(
          "Would you like to save your score?  Type your name below and hit okay to do so!"
        );
        // variable for playerscore so both name and score get stored in local storage (THIS NEEDS TO BE ADJUSTED)

        const playerScore = {
          currentname: playerName,
          currentscore: timerCount,
        };
        // access saved high scores
        const savedHighScores = localStorage.getItem("playerHighScore") || "[]";
        // add new high score from playerscore entry
        const newHighScores = [...JSON.parse(savedHighScores), playerScore];
        // save player current score to local storage
        localStorage.setItem("playerHighScore", JSON.stringify(newHighScores));
        // init to make sure array with scores is properly updated and show updated high score
        init();
        // clear timer
        clearInterval(timer);
        // hide questions and answers
        questionAnswerSection.hidden = true;
        // reveal restart button
        restartButton.hidden = false;
      }
    }
    // check if time has run out
    if (timerCount <= 0) {
      // clear interval
      clearInterval(timer);
      // alert player they have lost the game;
      alert("You Lose!  Try again?");
      // hide questions and answers
      questionAnswerSection.hidden = true;
      // reveal restart button
      restartButton.hidden = false;
    }
  }, 1000);
}
// display high scores function
function showScores() {
  highScoreList.innerHTML = "";
  for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    console.log(score);
    var li = document.createElement("li");
    li.textContent =
      "Name:    " + score.currentname + "   Score:    " + score.currentscore;
    li.setAttribute("data-index", i);
    highScoreList.appendChild(li);
  }
}

// refresh page function
function refreshPage() {
  location.reload();
}

// local storage reset function
function localstorageReset() {
  // clear local storage
  localStorage.clear();
  // run refresh function so scores are removed
  refreshPage();
}

// restart button
restartButton.addEventListener("click", refreshPage);

// start button
startButton.addEventListener("click", startTimer);

// reset high scores button
resetButton.addEventListener("click", localstorageReset);

init();
