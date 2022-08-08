// menu burger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// audio
const music = document.querySelector("#musicOff");
const sound = document.querySelector("#audio");
sound.volume = 0.2;

let logo = document.querySelector(".branding");
console.log(logo);

function play() {
  audio.play();
}
function stop() {
  audio.pause();
}
logo.addEventListener("mouseover", function () {
  play();
  music.innerText = "🔊";
});
logo.addEventListener("clicked", function () {
  play();
  music.innerText = "🔊";
});
logo.addEventListener("dblclick", function () {
  stop();
  music.innerText = "🔈";
});
logo.addEventListener("click", function () {
  stop();
  music.innerText = "🔈";
});
music.addEventListener("click", function () {
  stop();
  music.innerText = "🔈";
});
music.addEventListener("dblclick", function () {
  play();
  music.innerText = "🔊";
});

// arrow scrollin functionality

const scrollNav = document.querySelector("#scroll-nav");
const header = document.querySelector("#home");

window.addEventListener("scroll", function (e) {
  if (window.scrollY <= 600) {
    scrollNav.style.visibility = "hidden";
    console.log(window.scrollY);
  } else if (window.scrollY >= 600) {
    scrollNav.style.visibility = "visible";
  }
});
window.addEventListener("load", function () {
  scrollNav.style.visibility = "hidden";
});
