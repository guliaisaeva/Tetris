const username = document.getElementById("userName");
const container = document.querySelector(".container");
const link = document.querySelectorAll("a");

function addName() {
  const name = username.value;
  username.value = "";
  let box = document.createElement("div");
  box.setAttribute("id", "dropdown");
  let newBtn = document.createElement("button");
  newBtn.setAttribute("id", "dropBtn");
  newBtn.classList.add("dropbtn");
  let span = document.createElement("span");
  span.setAttribute("id", "score");
  let score = (span.innerHTML = "()");
  span.append(newBtn);
  newBtn.innerHTML = name + score;
  box.appendChild(newBtn);
  document.body.appendChild(box);

  let box2 = document.createElement("div");
  box2.classList.add("id", "dropdown-content");
  box2.setAttribute("id", "dropdownContent");
  box.appendChild(box2);
  let link = document.createElement("a");
  link.setAttribute("id", "start");
  let liText = (link.innerHTML = "Play");
  box2.appendChild(link);
  let link1 = document.createElement("a");
  link1.setAttribute("id", "reset");
  let liText1 = (link1.innerHTML = "Reset");
  box2.appendChild(link1);
  let link2 = document.createElement("a");
  link2.setAttribute("id", "delete");
  let liText2 = (link2.innerHTML = "Delete");
  box2.appendChild(link2);
  container.appendChild(box);

  newBtn.addEventListener("click", function () {
    let dis = document.querySelector(".dropdown-content");
    if (dis.style.display === "none") {
      dis.style.display = "block";
    } else {
      dis.style.display = "none";
    }
  });
  nextQuestion();
}

// let playerscore = 0;

// // reset
// const reset = document.querySelector("#reset");
// reset.addEventListener("click", function () {
//   score = 0;
//   score.textContent = 0;
// });

// // start game
// let timeLeft = 10;
// let timerInterval;
// function startGame() {
//   nextQuestion();
//   document.getElementById("play").disabled = true;
//   let timeDisplay = document.getElementById("timeDisplay");
//   timeDisplay.hidden = false;
//   timerInterval = setInterval(() => {
//     timeLeft -= 1;
//     timeDisplay.innerHTML = "Time Left : " + timeLeft;
//     if (timeLeft === 0) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);
// }
function nextQuestion() {
  let operations = document.getElementById("operator");
  let fisrtNumberInput = document.getElementById("number1");
  let secondNumberInput = document.getElementById("number2");
  operations.innerHTML = ["+", "-"];
  fisrtNumberInput.innerHTML = Math.floor(Math.random() * 100);
  secondNumberInput.innerHTML = Math.floor(Math.random() * 100);
}
// operations.innerHTML=
//   var operators = [{
//     sign: "+",
//     method: function(a,b){ return a + b; }
//   },{
//     sign: "-",
//     method: function(a,b){ return a - b; }
//   }];

//   var selectedOperator = Math.floor(Math.random()*operators.length);

//   operators[selectedOperator].sign
// }

// function checkAnswer() {
//   let answer = document.getElementById("answer");
//   if (answer == correctAnswer) {
//     score += 1;

//   }
// }
// function createElements(){
// let btn=document.createElement("button");
// let nameBtn=document.createTextNode("Gulia");
// let span=document.createElement("span")
// let spanText=document.createTextNode("()");
// btn.appendChild(nameBtn);
// btn.appendChild(span);
// span.appendChild(spanText);
// btn.setAttribute('id',"btn");
// span.setAttribute('id',"score");

// const dropdown=document.getElementById("dropdown");
// dropdown.appendChild(btn);
// const dropgroup=document.getElementById("dropdownGroup")
// dropgroup.appendChild(dropdown);
// // body.appendChild(dropgroup);

// let ul=document.createElement("ul");
// let li=document.createElement("li");
// let liText=document.createTextNode("Play")
// li.appendChild(liText);
// li.appendChild(ul);
// ul.appendChild(dropdown);

// }

// createElements();
