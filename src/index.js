import "./style.css";

const $score = document.querySelector(".score");
const $start_btn = document.querySelector(".start_btn");
const $game_area = document.querySelector(".game_area");
const $game_message = document.querySelector(".game_message");
let keys = {};

let $bird = document.createElement("div");
let $wing = document.createElement("div");
let player = {
  x: 0,
  y: 0,
  speed: 2,
};

const playGame = () => {
  if (keys.ArrowUp) {
    player.x -= player.speed;
  } else if (keys.ArrowDown) {
    player.x += player.speed;
  } else if (keys.ArrowLeft) {
    player.y -= player.speed;
  } else if (keys.ArrowRight) {
    player.y += player.speed;
  }
  $bird.style.top = player.x + "px";
  $bird.style.left = player.y + "px";
  window.requestAnimationFrame(playGame);
};
const start = () => {
  console.log("game start");
  $game_message.classList.add("hide");
  $start_btn.classList.add("hide");

  $bird.setAttribute("class", "bird");
  $wing.setAttribute("class", "wing");
  $bird.appendChild($wing);
  $game_area.appendChild($bird);
  player.x = $bird.offsetTop;
  player.y = $bird.offsetLeft;
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
