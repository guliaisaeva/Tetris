const main = document.querySelector(".main");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const nextTetroEl = document.getElementById("next-tetro");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const gameOver = document.querySelector("#game-over");
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
const second=1000;

//playfield with rows and columns,where 0 is empty cell
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
//y -horizontal(column) ,x-vertical(row)
// playfield[y] current row
// playfield[y][x]  current row and current cell
// 1=not empty cell -moving cell
// 2=fixed figure-fixed cell

function drawField() {
  let mainInnerHtml = "";
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {

      if (playfield[y][x] === 1) {
        mainInnerHtml += `<div  class ="cell movingCell"></div>`;
      } else if (playfield[y][x] === 2) {
        mainInnerHtml += `<div class ="cell fixedCell"></div>`;

      }
      else if(playfield[y][x] === 3){
        mainInnerHtml += `<div class ="cell projectionCell"></div>`;
      }
      else {
        //add empty cells 10x20
        mainInnerHtml += `<div class ="cell"></div>`;
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
        nextTetroInnerHtml += `<div class ="cell"></div>`;
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
        //we ad d +y or +x in order to go one step more
        playfield[activeTetro.y + y][activeTetro.x + x] =
          activeTetro.shape[y][x];
      }
    }
  }
}
// function draw projection
function addProjection(){
  cleanProjection();
  let row;
  const width=activeTetro.shape[0].length;
  const height=activeTetro.shape.length;
  for ( row = activeTetro.y; row < playfield.length; row++) {
    if(hasProjectionCollisions(row)){
   break
    }
  }
  console.log(row)
  console.log(activeTetro)

  row--;  //use row where the collusion didnt happen
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (activeTetro.shape[y][x] === 1 && playfield[row+y][activeTetro.x+x]===0) {
        playfield[row + y][activeTetro.x + x] = 3;
      }
    }
  }
}
 //function check if Projection has Collisions
function hasProjectionCollisions(row) {
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      const s=activeTetro.shape[y][x]; // 1,0
      // console.log(row+y)

      if (
        s &&
      ( playfield[row + y] === undefined ||
        playfield[row + y][activeTetro.x + x] === undefined ||
        playfield[row + y][activeTetro.x + x] === 2)
      )
     {
        return true;
      }
    }
  }
  return false;
}

//function clean projection
function cleanProjection(){
  for (let y = 0; y <playfield.length; y++) {
    for (let x = 0; x < playfield[0].length; x++) {
      if (playfield[y][x] === 3) {
        playfield[y][x] = 0;

      }
    }
  }
}
// function to rotate shapes (Tetro)
function rotateTetro() {
  const prevTetroState = activeTetro.shape;
  const prevX = activeTetro.x;
  activeTetro.shape = activeTetro.shape[0].map((val, index) =>
    activeTetro.shape.map((row) => row[index]).reverse()
  );
  if(isRightOutOfField()){
     // The current shape is out on right side.
     // Move it left enough so it doesn't go out.
     const w = activeTetro.shape[0].length;
     console.log(w)
     activeTetro.x = 9 - (w - 1);
  }
  if(isLeftOutOfField()){
    // The current shape is out on left side.
    // Move it right enough so it doesn't go out.
    activeTetro.x =0;
 }

  if (hasCollisions()) {
    activeTetro.shape = prevTetroState;
    activeTetro.x = prevX; // If changed in isRightOutOfField()
  }
}
function isRightOutOfField(){
  const shape=activeTetro.shape;   //one of the shapes
  const h=shape.length; // height
  const r=shape[0].length-1; // Right edge of the shape, i.e. the last column.
  console.log(r)
  for (let y = 0; y < h; y++) {
    const cell = shape[y][r];
    const playcell = playfield[activeTetro.y + y][activeTetro.x + r] // A cell on the playfield.
    console.log(playcell)
    if (cell == 1 && playcell === undefined) {
      return true;
    }
  }
  return false;
}

//attemt to do check left side
function isLeftOutOfField(){
  const shape=activeTetro.shape;
  const h=shape.length;// height
  for(let y=0;y<h;y++){
    const cell=shape[y][0];
    const playcell = playfield[activeTetro.y + y][activeTetro.x] // A cell on the playfield.
    if (cell == 1 && playcell === undefined) {
      return true;
    }
  }
  return false;
}


// control if tetromino has collision
//check if figure don't go out of field
function hasCollisions() {
  // const height=activeTetro.shape.length;
  // const width=activeTetro.shape[0].length;
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      const s=activeTetro.shape[y][x]; // 1,0
      if (
        s &&
        //vertical
        (playfield[activeTetro.y + y] === undefined ||
          //if figure out of left and right field
          playfield[activeTetro.y + y][activeTetro.x + x] === undefined ||  //meet end of field
          playfield[activeTetro.y + y][activeTetro.x + x] === 2) //if there is fixed figure
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
      //check if we have empty line,if have don't remove
      if (playfield[y][x] !== 2) {
        canRemoveLine = false;
        break;  ///break our loop
      }
    }
    //if we have filled line,we can remove
    if (canRemoveLine) {
      //slice for removing .Here y is index(row) 1=how many rows should be removed-)one line
      playfield.splice(y, 1); //remove one line
      playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); //0,0 are deleted and array is added,because when we delete,row also will be deleted
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
  const randomFigure = Math.floor(Math.random() * possibleFigure.length); // index(number)
  const figureKey=possibleFigure[randomFigure]; // example:O,I,L etc.
  const newTetro = figures[figureKey];  // two-dimensional array of figure
  const centerCol=Math.floor((10 - newTetro[0].length)/2);
  return {
    x: centerCol,
    y: 0,
    shape: newTetro
  };
}

// function fixedTetro
function fixedTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2; // 2 is fixed figure/cell if figure at the end of field,will turn to fixed
      }
    }
  }
}

// function to move shape to down
function moveTetroDown() {
  if(isPaused) return;

  activeTetro.y += 1;
  if (hasCollisions()) {
    activeTetro.y -= 1;
    fixedTetro(); //figure at the end of filed to fixed figure
    removeFullLines(); //if line is full,it should be remove
    activeTetro = nextTetro;
    if (hasCollisions()) {
      // alert("Game Over")
      reset();
    }
    nextTetro = getNewTetro();

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
 alert("Game Over!Try one more Time!")

}

//for using keyboard keys
document.onkeydown = function (e) {
  if (!isPaused) {
    e.preventDefault();
    console.log(e.keyCode);
    if (e.keyCode === 37) {
      //move to left
      activeTetro.x -= 1;
      if (hasCollisions()) {
        activeTetro.x += 1;
      }
    } else if (e.keyCode === 39) {
      //move to right
      activeTetro.x += 1;
      if (hasCollisions()) {
        activeTetro.x -= 1;
      }
    } else if (e.keyCode === 40) {
      // speed up to down
    moveTetroDown();
      // drawField(); //for a smoother moving
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
    addProjection();
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
  isPaused = !isPaused; //return false to true
  console.log("works");
});

//the game will start on click start button
startBtn.addEventListener("click", (e) => {
  e.target.innerHTML = "Start Again";
  isPaused = false;
  // gameTimerID = setTimeout(startGame, possibleLevel[currentlevel].speed);
  gameTimerID=setTimeout(startGame,second)
});

scoreEl.innerHTML = score;
levelEl.innerHTML = currentlevel;
drawField();
// function for starting to move down

function startGame() {
  moveTetroDown();
  if (!isPaused) {
    updateGameState();
    gameTimerID = setTimeout(startGame, second);
  }
}
// arrow functionality of mobile version
//for using keyboard keys

  const arrowUp=document.getElementById("arrow-up");
  const arrowLeft=document.getElementById("arrow-left");
  const arrowRight=document.getElementById("arrow-right");
  const arrowDown=document.getElementById("arrow-down");

    arrowLeft.addEventListener("click",()=>{
      if (!isPaused) {
      console.log("works")
      //move to left
      activeTetro.x -= 1;
      if (hasCollisions()) {
        activeTetro.x += 1;
      }
    }
    updateGameState();
    });
     arrowRight.addEventListener("click",()=>{
      if (!isPaused) {
      //move to right
      activeTetro.x += 1;
      if (hasCollisions()) {
        activeTetro.x -= 1;
      }
    }
    updateGameState();
    });
    arrowDown.addEventListener("click",()=>{
      if (!isPaused) {
      // speed up to down
    moveTetroDown();
      // drawField(); //for a smoother moving
      }
      updateGameState();
    });
    arrowUp.addEventListener("click",()=>{
      if (!isPaused) {
      //to up  rotate
      rotateTetro();
      }
      updateGameState();
    })

