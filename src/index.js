import "./style.css";

const $score = document.querySelector(".score");
const $btn_container = document.querySelector(".btn_container");
const $start_btn = document.querySelector(".start_btn");
const $game_area = document.querySelector(".game_area");
const $game_message = document.querySelector(".game_message");
let keys = {};

let player = {
  x: 0,
  y: 0,
  speed: 3,
  score: 0,
  isAlive: false,
};
let pipe = {
  startPos: 0,
  spaceBetwweenRow: 0,
  spaceBetweenCol: 0,
  cnt: 0,
};

const makePipe = (p) => {
  let totalHeight = $game_area.offsetHeight;
  let totalWidth = $game_area.offsetWidth;
  let $top_pipe = document.createElement("div");
  let $bottom_pipe = document.createElement("div");

  $top_pipe.classList.add("pipe");
  $top_pipe.height = Math.floor(Math.random() * 350);
  $top_pipe.style.height = $top_pipe.height + "px";
  $top_pipe.style.top = "0px";
  $top_pipe.style.left = totalWidth + p + "px";
  $top_pipe.y = totalWidth + p;
  $game_area.appendChild($top_pipe);

  pipe.spaceBetwweenRow = Math.floor(Math.random() * 250) + 150;

  $bottom_pipe.classList.add("pipe");
  $bottom_pipe.style.height =
    totalHeight - $top_pipe.height - pipe.spaceBetwweenRow + "px";
  $bottom_pipe.style.left = totalWidth + p + "px";
  $bottom_pipe.style.bottom = "0px";
  $bottom_pipe.y = totalWidth + p;
  $game_area.appendChild($bottom_pipe);
};
const gameOver = () => {
  player.isAlive = false;
  $score.classList.add("hide");

  $game_message.classList.remove("hide");
  $game_message.innerHTML =
    "<i>GAME OVER<br/><br/>당신의 점수는 " +
    player.score +
    "점입니다.<br/>다시 시작하려면 여기를 누르세요.</i>";
};
const playGame = () => {
  if (!player.isAlive) return;

  let $mercy = document.querySelector(".mercy");
  let $wing = document.querySelector(".wing");
  let move = false;
  if ((keys.ArrowUp || keys.Space) && player.x > 0) {
    player.x -= player.speed * 5;
    move = true;
  } else if (
    keys.ArrowDown &&
    player.x < $game_area.offsetHeight - $mercy.offsetHeight
  ) {
    player.x += player.speed;
    move = true;
  } else if (keys.ArrowLeft && player.y > 0) {
    player.y -= player.speed;
    move = true;
  } else if (
    keys.ArrowRight &&
    player.y < $game_area.offsetWidth - $mercy.offsetWidth
  ) {
    player.y += player.speed;
    move = true;
  }

  player.x += 2 * player.speed;
  if (player.x > $game_area.offsetHeight) {
    console.log("game over");
    gameOver();
  }

  if (move) {
    $wing.pos = $wing.pos === 15 ? 25 : 15;
    $wing.style.top = $wing.pos + "px";
    $wing.style.left = "-" + $wing.pos + "px";
  } else {
    $wing.style.top = "15px";
    $wing.style.left = "-20px";
  }
  $mercy.style.top = player.x + "px";
  $mercy.style.left = player.y + "px";
  $score.innerText = "점수 : " + ++player.score;
  window.requestAnimationFrame(playGame);
};
const start = () => {
  console.log("game start");
  player.score = 0;
  player.isAlive = true;
  $game_area.innerHTML = "";

  $score.classList.remove("hide");
  $game_message.classList.add("hide");
  $btn_container.classList.add("hide");

  let $mercy = document.createElement("div");
  let $wing = document.createElement("div");
  $mercy.setAttribute("class", "mercy");
  $wing.setAttribute("class", "wing");
  $wing.pos = 15;
  $wing.style.top = $wing.pos + "px";
  $mercy.appendChild($wing);
  $game_area.appendChild($mercy);
  player.x = $mercy.offsetTop;
  player.y = $mercy.offsetLeft;

  pipe.startPos = 0;
  pipe.spaceBetweenCol = 400;
  pipe.cnt = Math.floor($game_area.offsetWidth / pipe.spaceBetweenCol);
  for (let i = 0; i < pipe.cnt; i++) {
    makePipe(pipe.startPos * pipe.spaceBetweenCol);
    pipe.startPos++;
  }

  window.requestAnimationFrame(playGame);
};
const onKeyDown = (e) => {
  console.log("on");
  keys[e.code] = true;
  console.log(e.code);
};
const onKeyUp = (e) => {
  console.log(e.code);
  keys[e.code] = false;
  console.log("off");
};

$start_btn.addEventListener("click", start);
$game_message.addEventListener("click", start);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
