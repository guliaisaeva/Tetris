const main = document.querySelector(".main");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const nextTetroEl = document.getElementById("next-tetro");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const gameOver = document.getElementById("game-over");
const currentlevel = 1;
let isPaused = true;
let gameTimerID;
let score = 0;
let possibleLevel = {
  1: { scorePerLine: 10, speed: 400, nextLevelScore: 100 },
  2: { scorePerLine: 15, speed: 300, nextLevelScore: 200 },
  3: { scorePerLine: 20, speed: 200, nextLevelScore: 300 },
  4: { scorePerLine: 25, speed: 100, nextLevelScore: 400 },
  5: { scorePerLine: 30, speed: 50, nextLevelScore: Infinity },
};

let playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

];


// function getRandomColor() {
//   let color = ["green", "red", "pink", "yellow", "blue"];
//   let randomColor = Math.floor(Math.random() * color.length);
//   let newColor = color[randomColor];
// }


let figures = {
  O: [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 1],

  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  J: [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
};
let activeTetro = getNewTetro();
let nextTetro = getNewTetro();

//function drawField dy cells inside of main area
function drawField() {
  let mainInnerHtml = "";

  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        mainInnerHtml += `<div  class ="cell movingCell"></div>`;
      } else if (playfield[y][x] === 2) {
        mainInnerHtml += `<div class ="cell fixedCell"></div>`;
      } else {
        mainInnerHtml += `<div  class ="cell"></div>`;
      }
    }
  }
  main.innerHTML = mainInnerHtml;
}
//function to drow next shape
function drawNextTetro() {
  let nextTetroInnerHtml = "";
  for (let y = 0; y < nextTetro.shape.length; y++) {
    for (let x = 0; x < nextTetro.shape[y].length; x++) {
      if (nextTetro.shape[y][x]) {
        nextTetroInnerHtml += `<div class="cell movingCell"></div>`;
      }
      else {
        nextTetroInnerHtml += `<div  class ="cell"></div>`;
      }
    }
    nextTetroInnerHtml += "<br/>";
  }
  nextTetroEl.innerHTML = nextTetroInnerHtml;
}
// remove after tetro moving old tetro position
function removePrevActiveTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 0;
      }
    }
  }
}
// updating active tetro
function addActiveTetro() {
  removePrevActiveTetro();
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (activeTetro.shape[y][x] === 1) {
        playfield[activeTetro.y + y][activeTetro.x + x] =
          activeTetro.shape[y][x];
      }
    }
  }
}

// function to rotate shapes (Tetro)
function rotateTetro() {
  const prevTetroState = activeTetro.shape;
  activeTetro.shape = activeTetro.shape[0].map((val, index) =>
    activeTetro.shape.map((row) => row[index]).reverse()
  );

  if (hasCollisions()) {
    activeTetro.shape = prevTetroState;
  }
}
// rotateTetro();

// control if tetromino has collision
function hasCollisions() {
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (
        activeTetro.shape[y][x] &&
        (playfield[activeTetro.y + y] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

// control lines if they are filled or not
function removeFullLines() {
  let canRemoveLine = true;
  filledlines = 0;
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] !== 2) {
        canRemoveLine = false;
        break;
      }
    }
    if (canRemoveLine) {
      playfield.splice(y, 1);
      playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      filledlines += 1;
    }
    canRemoveLine = true;
  }
  switch (filledlines) {
    case 1:
      score += possibleLevel[currentlevel].scorePerLine;
      break;
    case 2:
      score += possibleLevel[currentlevel].scorePerLine * 3;
      break;
    case 3:
      score += possibleLevel[currentlevel].scorePerLine * 6;
      break;
    case 4:
      score += possibleLevel[currentlevel].scorePerLine * 12;
      break;
  }

  scoreEl.innerHTML = score;
  if (score >= possibleLevel[currentlevel].nextLevelScore) {
    currentlevel++;
    levelEl.innerHTML = currentlevel;
  }
}

// function to get new shape or tetromino
function getNewTetro() {
  const possibleFigure = "OILJTSZ";
  const randomFigure = Math.floor(Math.random() * 7);
  const newTetro = figures[possibleFigure[randomFigure]];
  return {
    x: Math.floor((10 - newTetro[0].length) / 2),
    y: 0,
    shape: newTetro
  };
}

// function fixedTetro
function fixedTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }
}

// function to move shape to down
function moveTetroDown() {
  if (!isPaused) {
    activeTetro.y += 1;
    if (hasCollisions()) {
      activeTetro.y -= 1;
      fixedTetro();
      removeFullLines();
      activeTetro = nextTetro;
      if (hasCollisions()) {
        // alert("Game Over")
        reset();
      }
      nextTetro = getNewTetro();

    }
  }

}

//function to drop quick the tetromino
function dropTetro() {
  for (let y = activeTetro.y; y < playfield.length; y++) {
    activeTetro.y += 1;
    if (hasCollisions()) {
      activeTetro.y -= 1;
      break;
    }
  }
}

// to reset the game

function reset() {
  isPaused = true;
  clearTimeout(gameTimerID);
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  ];
  drawField();
  gameOver.style.display = "block";

}

document.onkeydown = function (e) {
  if (!isPaused) {
    e.preventDefault();
    console.log(e.keyCode);
    if (e.keyCode === 37) {
      //to left
      activeTetro.x -= 1;
      if (hasCollisions()) {
        activeTetro.x += 1;
      }
    } else if (e.keyCode === 39) {
      //to right
      activeTetro.x += 1;
      if (hasCollisions()) {
        activeTetro.x -= 1;
      }
    } else if (e.keyCode === 40) {
      // speed up to down
      moveTetroDown();
    } else if (e.keyCode === 38) {
      //to up  rotate
      rotateTetro();
    }
    else if (e.keyCode === 32) {
      //when spacebar is pressed,tetromino drop to quick down
      dropTetro();
    }

    updateGameState();

  }

};
//updating of Game state
function updateGameState() {
  if (!isPaused) {
    addActiveTetro();
    drawField();
    drawNextTetro();
  }
}

//the game will paused on click pause button
pauseBtn.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Pause") {
    e.target.innerHTML = "Play";
    clearTimeout(gameTimerID);
  }
  else {
    e.target.innerHTML = "Pause";
    gameTimerID = setTimeout(startGame, possibleLevel[currentlevel].speed);
  }
  isPaused = !isPaused;
  console.log("works");
});

//the game will start on click start button
startBtn.addEventListener("click", (e) => {
  e.target.innerHTML = "Start Again";
  isPaused = false;
  gameTimerID = setTimeout(startGame, possibleLevel[currentlevel].speed);
  gameOver.style.display = "none";
});


scoreEl.innerHTML = score;
levelEl.innerHTML = currentlevel;
drawField();


// function for starting to move down

function startGame() {

  moveTetroDown();
  if (!isPaused) {
    updateGameState();
    gameTimerID = setTimeout(startGame, possibleLevel[currentlevel].speed);
  }
}
