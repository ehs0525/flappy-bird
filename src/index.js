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

const isCollided = (mercy, pipe) => {
  const mercyRect = mercy.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();

  return (
    mercyRect.right - 20 >= pipeRect.left &&
    mercyRect.left + 20 <= pipeRect.right &&
    mercyRect.bottom - 10 >= pipeRect.top &&
    mercyRect.top + 10 <= pipeRect.bottom
  );

  // // 캔버스 생성
  // const canvas = document.createElement("canvas");
  // const context = canvas.getContext("2d");

  // // 두 요소 중 크기가 더 큰 요소의 크기로 캔버스 설정
  // canvas.width = Math.max(mercyRect.width, pipeRect.width);
  // canvas.height = Math.max(mercyRect.height, pipeRect.height);

  // // mercy 그리기
  // context.clearRect(0, 0, canvas.width, canvas.height);
  // context.drawImage(mercy, mercyRect.x, mercyRect.y);

  // // pipe 그리기
  // context.globalCompositeOperation = "source-in";
  // context.drawImage(pipe, pipeRect.x, pipeRect.y);

  // // 겹치는 픽셀 확인
  // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // const data = imageData.data;

  // for (let i = 3; i < data.length; i += 4) {
  //   if (data[i] !== 0) {
  //     // 투명하지 않은 부분이 겹치는 경우
  //     return true;
  //   }
  // }

  // // 겹치는 부분이 없는 경우
  // return false;
};
const movePipes = (mercy) => {
  let pipes = document.querySelectorAll(".pipe");
  let passed = false;

  pipes.forEach((pipe) => {
    pipe.y -= player.speed;
    pipe.style.left = pipe.y + "px";
    if (pipe.y < -pipe.width) {
      pipe.parentElement.removeChild(pipe);
      passed = true;
    }
    if (isCollided(mercy, pipe)) {
      console.log("충돌!");
      gameOver(mercy);
    }
  });

  if (passed) makePipe(0);
};
const makePipe = (p) => {
  let totalHeight = $game_area.offsetHeight;
  let totalWidth = $game_area.offsetWidth;
  let $top_pipe = document.createElement("div");
  let $bottom_pipe = document.createElement("div");

  $top_pipe.classList.add("pipe", "upside_down");
  $top_pipe.width = 100;
  $top_pipe.height = Math.floor(Math.random() * 500);
  $top_pipe.style.width = $top_pipe.width + "px";
  $top_pipe.style.height = $top_pipe.height + "px";
  $top_pipe.style.top = "0px";
  $top_pipe.style.left = totalWidth + p + "px";
  $top_pipe.y = totalWidth + p;
  $game_area.appendChild($top_pipe);

  pipe.spaceBetwweenRow = Math.floor(Math.random() * 250) + 250;

  $bottom_pipe.classList.add("pipe");
  $bottom_pipe.style.width = $top_pipe.width + "px";
  $bottom_pipe.style.height =
    totalHeight - $top_pipe.height - pipe.spaceBetwweenRow + "px";
  $bottom_pipe.style.left = totalWidth + p + "px";
  $bottom_pipe.style.bottom = "0px";
  $bottom_pipe.y = totalWidth + p;
  $game_area.appendChild($bottom_pipe);
};
const gameOver = (mercy) => {
  player.isAlive = false;
  $score.classList.add("hide");
  mercy.classList.add("upside_down");

  $game_message.classList.remove("hide");
  $game_message.innerHTML =
    "<i>GAME OVER<br/><br/>당신의 점수는 " +
    player.score +
    "점입니다.<br/>다시 시작하려면 아무 곳이나 누르세요.</i>";
};
const playGame = () => {
  if (!player.isAlive) return;

  let startTime = new Date().getTime();
  let currTime = new Date().getTime();
  while (currTime - startTime < 10) {
    currTime = new Date().getTime();
  }

  let $mercy = document.querySelector(".mercy");
  let $wing = document.querySelector(".wing");
  let move = false;

  movePipes($mercy);
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
    gameOver($mercy);
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
  $wing.style.top = "15px";
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
