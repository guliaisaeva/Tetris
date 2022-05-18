const username = document.getElementById("userName");
const addBtn = document.getElementById("button-addon2");
const listBtn = document.getElementById("dropdownMenuButton1");
const score = document.getElementById("score");
const dropdown = document.getElementById("dropdown");
const dropdownGroup = document.getElementById("dropdownGroup");
let playerscore = 0;

function addName() {
  addBtn.addEventListener("click", function () {
    const name = username.value + "(0)";
    listBtn.innerHTML = name;
    let newBtn = document.createElement("button");
    newBtn.innerHTML = name;
    document.body.appendChild(newBtn);
    username.value = "";
  });
}
addName();

// reset
const reset = document.querySelector("#reset");
reset.addEventListener("click", function () {
  score = 0;
  score.textContent = 0;
});

// start game
let timeLeft = 10;
let timerInterval;
function startGame() {
  nextQuestion();
  document.getElementById("play").disabled = true;
  let timeDisplay = document.getElementById("timeDisplay");
  timeDisplay.hidden = false;
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    timeDisplay.innerHTML = "Time Left : " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
function nextQuestion() {
  let operations = document.getElementById("operator");
  let fisrtNumberInput = document.getElementById("number1");
  let secondNumberInput = document.getElementById("number2");
  operations.innerHTML = ["+", "-"];
  fisrtNumberInput.innerHTML = Math.floor(Math.random() * 100);
  secondNumberInput.innerHTML = Math.floor(Math.random() * 100);
  // operations.innerHTML=
}

function checkAnswer() {
  let answer = document.getElementById("answer");
  if (answer == correctAnswer) {
    score += 1;
  }
}
