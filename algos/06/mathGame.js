const username = document.getElementById("userName");
const addBtn = document.getElementById("button-addon2");

function addName() {
  addBtn.addEventListener("click", function () {
    // username.innerText = ;
    document.getElementById("dropdownMenuButton1").innerHTML = `${username}`;
  });
}
