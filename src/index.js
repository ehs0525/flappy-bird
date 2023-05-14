import "./style.css";

const $score = document.querySelector(".score");
const $btn_container = document.querySelector(".btn_container");
const $start_btn = document.querySelector(".start_btn");
const $game_area = document.querySelector(".game_area");
const $game_message = document.querySelector(".game_message");
let keys = {};

let $mercy = document.createElement("div");
let $wing = document.createElement("div");
let player = {
  x: 0,
  y: 0,
  speed: 2,
  score: 0,
};

const playGame = () => {
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
  $game_message.classList.add("hide");
  $btn_container.classList.add("hide");

  $mercy.setAttribute("class", "mercy");
  $wing.setAttribute("class", "wing");
  $wing.pos = 15;
  $wing.style.top = $wing.pos + "px";
  $mercy.appendChild($wing);
  $game_area.appendChild($mercy);
  player.x = $mercy.offsetTop;
  player.y = $mercy.offsetLeft;

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
