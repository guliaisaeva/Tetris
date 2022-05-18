const username = document.getElementById("userName");
const addBtn = document.getElementById("button-addon2");
const listBtn = document.getElementById("dropdownMenuButton1");
const score = document.getElementById("score");
const dropdown = document.getElementById("dropdown");
const dropdownGroup = document.getElementById("dropdownGroup");

function addName() {
  addBtn.addEventListener("click", function () {
    const name = username.value + "(0)";
    listBtn.innerHTML = name;
    let newBtn = document.createElement("button");
    newBtn.innerHTML = name;
    document.body.appendChild(newBtn);
  });
}
addName();
