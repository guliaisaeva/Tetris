let loadedUsers = localStorage.getItem("users");
const userObj = JSON.parse(loadedUsers);
for (var user in userObj) {
  addNewUser(user, userObj[user]);
}

function save() {
  let users = {};

  let buttons = document.querySelectorAll(".dropbtn");
  for (let i = 0; i < buttons.length; i++) {
    let name = buttons[i].id;
    console.log(name);
    let spanId = "score_" + name;
    let span = document.getElementById(spanId);
    users[name] = span.innerHTML;
    console.log(span.innerHTML);
    console.log(spanId);
  }
  console.log(users);
  const myJSON = JSON.stringify(users);
  window.localStorage.setItem("users", myJSON);
}

const username = document.getElementById("userName");

function addUser() {
  const name = username.value;
  addNewUser(name, 0);
}

function addNewUser(userName, scoreIn) {
  console.log(scoreIn);
  let newBtn = document.createElement("button");
  newBtn.setAttribute("id", userName);
  newBtn.classList.add("dropbtn");
  document.body.appendChild(newBtn);
  let spanId = "score_" + userName;
  newBtn.innerHTML =
    userName + " ( <span id='" + spanId + "' >" + scoreIn + "</span> ) ";

  // play

  let playLink = document.createElement("a");
  playLink.innerHTML = " Play ";
  document.body.appendChild(playLink);
  let score = 0;

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

      // timer
      let startTime = new Date();

      let userAnswer = prompt(
        " Math question:  " +
          firstNumber +
          oper +
          secondNumber +
          "=" +
          "?" +
          "Please enter your answer"
      );
      let endTime = new Date();
      let difTime = (endTime - startTime) / 1000;
      let timer = document.getElementById("count");

      if (parseInt(userAnswer) == correctAnswer && difTime < 5) {
        alert("Great,you are right!");
        score++;
        let userScore = document.getElementById(spanId);
        userScore.innerHTML = score;
      } else {
        alert("You are wrong");
      }

      save();

      console.log(parseInt(userAnswer) == correctAnswer);
      console.log(score);

      if (userAnswer === null) {
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
    save();
  });

  // reset
  let resetLink = document.createElement("a");
  resetLink.innerHTML = " Reset ";
  document.body.appendChild(resetLink);
  resetLink.addEventListener("click", function () {
    let scoreSpan = document.getElementById(spanId);
    scoreSpan.innerHTML = 0;
  });
}

//   let dis = document.querySelector(".dropdown-content");
//   newBtn.addEventListener("click", function () {
//     if (dis.style.display === "none") {
//       dis.style.display = "block";
//     } else {
//       dis.style.display = "none";
//     }
//   });

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
