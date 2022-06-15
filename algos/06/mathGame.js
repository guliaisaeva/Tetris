const username = document.getElementById("userName");

function addNewUser() {
  const name = username.value;
  let newBtn = document.createElement("button");
  newBtn.setAttribute("id", name);
  newBtn.classList.add("dropbtn");
  document.body.appendChild(newBtn);
  let spanId = "score_" + name;
  console.log(spanId);
  newBtn.innerHTML = name + " ( <span id='" + spanId + "' >0</span> ) ";

  // play

  let playLink = document.createElement("a");
  playLink.innerHTML = " Play ";
  document.body.appendChild(playLink);
  let score = 0;
  username.value = "";

  playLink.addEventListener("click", function () {
    for (i = 1; i <= 5; i++) {
      let firstNumber = Math.floor(Math.random() * 10);
      let secondNumber = Math.floor(Math.random() * 10);
      let operators = [
        {
          sign: "+",
          method: function (a, b) {
            return a + b;
          },
        },
        {
          sign: "-",
          method: function (a, b) {
            return a - b;
          },
        },
      ];
      let selectedOperator = Math.floor(Math.random() * operators.length);
      let oper = operators[selectedOperator].sign;
      let correctAnswer = operators[selectedOperator].method(
        firstNumber,
        secondNumber
      );

      let question = prompt(
        " Math question:  " +
          firstNumber +
          oper +
          secondNumber +
          "=" +
          "?" +
          "Please enter your answer"
      );

      if (parseInt(question) == correctAnswer) {
        alert("Great,you are right!");
        score++;
        let userScore = document.getElementById(spanId);
        userScore.innerHTML = score;
      } else {
        alert("You are wrong");
      }

      if (question === null) {
        return;
      }
    }
  });

  // delete

  let deleteLink = document.createElement("a");
  deleteLink.innerHTML = " Delete ";
  document.body.appendChild(deleteLink);

  deleteLink.addEventListener("click", function () {
    newBtn.remove();
    playLink.remove();
    resetLink.remove();
    deleteLink.remove();
  });

  // reset
  let resetLink = document.createElement("a");
  resetLink.innerHTML = " Reset ";
  document.body.appendChild(resetLink);
  resetLink.addEventListener("click", function () {
    let scoreSpan = document.getElementById(spanId);
    scoreSpan.innerHTML = 0;
    // console.log(spanId);
  });
}
// const link = document.querySelectorAll("a");

// function addName() {
//   const name = username.value;
//   username.value = "";
//   let box = document.createElement("div");
//   box.setAttribute("id", "dropdown");
//   let newBtn = document.createElement("button");
//   newBtn.setAttribute("id", "dropBtn");
//   newBtn.classList.add("dropbtn");
//   let span = document.createElement("span");
//   span.setAttribute("id", "score");
//   let score = (span.innerHTML = "()");
//   span.append(newBtn);
//   newBtn.innerHTML = name + score;
//   box.appendChild(newBtn);
//   document.body.appendChild(box);

//   let box2 = document.createElement("div");
//   box2.classList.add("id", "dropdown-content");
//   box2.setAttribute("id", "dropdownContent");
//   box.appendChild(box2);
//   let link = document.createElement("a");
//   link.setAttribute("id", "start");
//   let liText = (link.innerHTML = "Play");
//   box2.appendChild(link);
//   let link1 = document.createElement("a");
//   link1.setAttribute("id", "reset");
//   let liText1 = (link1.innerHTML = "Reset");
//   box2.appendChild(link1);
//   let link2 = document.createElement("a");
//   link2.setAttribute("id", "delete");
//   let liText2 = (link2.innerHTML = "Delete");
//   box2.appendChild(link2);
//   container.appendChild(box);

//   let dis = document.querySelector(".dropdown-content");
//   newBtn.addEventListener("click", function () {
//     if (dis.style.display === "none") {
//       dis.style.display = "block";
//     } else {
//       dis.style.display = "none";
//     }
//   });

//   // play
//   let play = document.querySelector("#start");
//   let quiz = document.querySelector(".quiz");

//   if (play) {
//     play.addEventListener("click", function () {
//       quiz.style.display = "block";

//       var count = 10;
//       var interval = setInterval(function () {
//         document.getElementById("count").innerHTML = count;
//         count--;
//         if (count === 0) {
//           clearInterval(interval);
//           document.getElementById("count").innerHTML = "0:0";
//           // or...
//           alert("You're out of time!");
//         }
//       }, 1000);
//     });
//   }

//   // reset
//   let reset = document.querySelector("#reset");
//   if (reset) {
//     reset.addEventListener("click", function () {
//       score = 0;
//       newBtn.innerHTML = name + "(" + score + ")";
//       count.remove();
//     });
//   }
//   let del = document.querySelector("#delete");
//   if (del) {
//     del.addEventListener("click", function () {
//       newBtn.remove();
//       quiz.remove();
//       dis.remove();
//     });
//   }
// }

// // function question() {
// //   let firstNumber = Math.floor(Math.random() * 10);
// //   let secondNumber = Math.floor(Math.random() * 10);
// //   let operators = [
// //     {
// //       sign: "+",
// //       method: function (a, b) {
// //         return a + b;
// //       },
// //     },
// //     {
// //       sign: "-",
// //       method: function (a, b) {
// //         return a - b;
// //       },
// //     },
// //   ];
// //   let selectedOperator = Math.floor(Math.random() * operators.length);
// //   let oper = operators[selectedOperator].sign;
// //   let q = firstNumber + oper + secondNumber + "=" + "?";
// //   for (let i = 0; i <= 5; i++) {
// //     document.getElementById("question").innerHTML = q;
// //   }
// //   let correctAnswer = operators[selectedOperator].method(
// //     firstNumber,
// //     secondNumber
// //   );
// // }
// // function uAnswer() {
// //   let score = document.querySelector("#score");
// //   let newBtn = document.querySelector("#dropBtn");
// //   let userAnswer = parseInt(document.getElementById("answer").value);
// //   const name = username.value;
// //   score = 0;
// //   if (correctAnswer === userAnswer) {
// //     alert("Great! Correct! Refresh the page to play again!");
// //     score++;
// //     newBtn.innerHTML = name + "(" + score + ")";
// //   } else {
// //     alert("Wrong! Try again!");
// //     return (userAnswer.value = "");
// //   }
// //   userAnswer.value = "";
// // }

// let firstNumber = Math.floor(Math.random() * 10);
// let secondNumber = Math.floor(Math.random() * 10);
// let operators = [
//   {
//     sign: "+",
//     method: function (a, b) {
//       return a + b;
//     },
//   },
//   {
//     sign: "-",
//     method: function (a, b) {
//       return a - b;
//     },
//   },
// ];

// let selectedOperator = Math.floor(Math.random() * operators.length);

// let oper = operators[selectedOperator].sign;
// document.getElementById("question").innerHTML =
//   firstNumber + oper + secondNumber + "=" + "?";

// let correctAnswer = operators[selectedOperator].method(
//   firstNumber,
//   secondNumber
// );

// function uAnswer() {
//   let score = document.querySelector("#score");
//   let newBtn = document.querySelector("#dropBtn");
//   let userAnswer = parseInt(document.getElementById("answer").value);
//   const name = username.value;
//   score = 0;
//   if (correctAnswer === userAnswer) {
//     alert("Great! Correct! Refresh the page to play again!");
//     score++;
//     newBtn.innerHTML = name + "(" + score + ")";
//   } else {
//     alert("Wrong! Try again!");
//     return (userAnswer.value = "");
//   }
//   userAnswer.value = "";
// }
// // // start game

// // let timeLeft = 10;
// // let timerInterval;
// // function startGame() {
// //   // nextQuestion();
// //   document.getElementById("start").disabled = true;
// //   let timeDisplay = document.getElementById("timeDisplay");
// //   timeDisplay.hidden = false;
// //   timerInterval = setInterval(() => {
// //     timeLeft -= 1;
// //     timeDisplay.innerHTML = "Time Left : " + timeLeft;
// //     if (timeLeft === 0) {
// //       clearInterval(timerInterval);
// //     }
// //   }, 1000);
// // }
// // startGame();

// //  Math Questions

// // answer();

// // operations.innerHTML=
// //   var operators = [{
// //     sign: "+",
// //     method: function(a,b){ return a + b; }
// //   },{
// //     sign: "-",
// //     method: function(a,b){ return a - b; }
// //   }];

// //   var selectedOperator = Math.floor(Math.random()*operators.length);

// //   operators[selectedOperator].sign
// // }

// // function checkAnswer() {
// //   let answer = document.getElementById("answer");
// //   if (answer == correctAnswer) {
// //     score += 1;

// //   }
