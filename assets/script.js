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
