import "./style.css";

const $score = document.querySelector(".score");
const $start_btn = document.querySelector(".start_btn");
const $game_area = document.querySelector(".game_area");
const $game_message = document.querySelector(".game_message");

const start = () => {
  console.log("game start");
  $game_message.classList.add("hide");
  $start_btn.classList.add("hide");
};
const onKeyDown = () => {
  console.log("on");
};
const onKeyUp = () => {
  console.log("off");
};

$start_btn.addEventListener("click", start);
$game_message.addEventListener("click", start);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
