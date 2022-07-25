//Getting Variables
let playerScore = 0;
let cpuScore = 0;

const playerScore_span = document.querySelector(".player-score");
const cpuScore_span = document.querySelector(".cpu-score");
const result_text_p = document.querySelector(".result-text > p");
const display_text = document.querySelector(".display-text");

function game(userChoice) {
  let cpuChoice = getComputerChoice();

  switch (userChoice + cpuChoice) {
    //Win
    case "rockscissor":
    case "paperrock":
    case "scissorpaper":
      win(userChoice, cpuChoice);
      break;
    //Lose
    case "rockpaper":
    case "paperscissor":
    case "scissorrock":
      lose(userChoice, cpuChoice);
      break;
    //Draw
    case "rockrock":
    case "paperpaper":
    case "scissorscissor":
      draw(userChoice);
      break;
  }
}

function refreshGame() {
  playerScore = 0;
  cpuScore = 0;
  updateScore("player");
  updateScore("cpu");
  result_text_p.innerHTML = `Tap a card to play`;
}

function updateScore(person) {
  if (person == "player") {
    playerScore_span.innerHTML = `${playerScore}`;
  } else {
    cpuScore_span.innerHTML = `${cpuScore}`;
  }
}

//Funcs - Handle game results
function win(userChoice, cpuChoice) {
  playerScore++;
  updateScore("player");
  result_text_p.innerHTML = `Congratulations, Your ${userChoice} beat CPU's ${cpuChoice}`;
  flashColor("green");
}

function lose(userChoice, cpuChoice) {
  cpuScore++;
  updateScore("cpu");
  result_text_p.innerHTML = `Unlucky, Your ${userChoice} lost to CPU's ${cpuChoice}`;
  flashColor("red");
}

function draw(userChoice) {
  result_text_p.innerHTML = `It's a Draw, You both chose ${userChoice}`;
  flashColor("amber");
}

function getComputerChoice() {
  choices = ["rock", "paper", "scissor"];
  let randomNum = Math.floor(Math.random() * 3);
  return choices[randomNum];
}

function flashColor(color) {
  const score_display = document.querySelector(".score-display");
  switch (color) {
    case "green":
      score_display.classList.add("flash-green");
      setTimeout(() => score_display.classList.remove("flash-green"), 1000);
      break;
    case "amber":
      score_display.classList.add("flash-amber");
      setTimeout(() => score_display.classList.remove("flash-amber"), 1000);
      break;
    case "red":
      score_display.classList.add("flash-red");
      setTimeout(() => score_display.classList.remove("flash-red"), 1000);
      break;
  }
}

function main() {
  const refreshBtn = document.querySelector(".refresh-icon");
  const rockBtn = document.querySelector(".rock-img");
  const paperBtn = document.querySelector(".paper-img");
  const scissorBtn = document.querySelector(".scissor-img");
  const welcomeBtn = document.querySelector(".welcome-btn");
  const mainSection_div = document.querySelector(".main-section");
  const welcomePage_div = document.querySelector(".welcome-page");

  //Event Listeners
  welcomeBtn.addEventListener("click", () => {
    mainSection_div.classList.remove("invis");
    welcomePage_div.classList.add("invis");
  });

  refreshBtn.addEventListener("click", () => {
    refreshGame();
  });
  rockBtn.addEventListener("click", () => {
    game("rock");
  });
  paperBtn.addEventListener("click", () => {
    game("paper");
  });
  scissorBtn.addEventListener("click", () => {
    game("scissor");
  });
}

main();
