const closeButton = document.querySelector("#close-button");
const score = document.querySelector(".score-count");
const rulesBox = document.querySelector(".rules-box");
const rulesBtn = document.querySelector("#rules-btn");
const rockBtn = document.querySelector("#rock-btn");
const paperBtn = document.querySelector("#paper-btn");
const scissorsBtn = document.querySelector("#scissors-btn");
const triangleImg = document.querySelector(".triangle");
let gameInterface = document.querySelector(".game-interface");
let startingScreen = document.querySelector(".starting-screen");
let scoreCount = 0;


const buttonsArray = [rockBtn, paperBtn, scissorsBtn];

// computer random pick
const computerPick = () => {
  const randomBtnPick = Math.floor(Math.random() * buttonsArray.length);
  const computerBtnPick = buttonsArray[randomBtnPick];
  return computerBtnPick;
};

// user chosen button
const userPick = (clickedButton) => {
  return clickedButton;
};

buttonsArray.forEach((button) => {
  button.addEventListener("click", () => {
    const userSelection = userPick(button);
    const computerSelection = computerPick();
    displayResults(userSelection, computerSelection);
  });
});

const displayResults = (user, computer) => {
  startingScreen.classList.add("hidden");
  const results = document.createElement("div");
  results.classList.add("results");

  gameInterface.appendChild(results);

  const userPick =
    user.id === "rock-btn"
      ? "Rock"
      : user.id === "scissors-btn"
      ? "Scissors"
      : user.id === "paper-btn"
      ? "Paper"
      : "Pick Again";

  const computerPick =
    computer === rockBtn
      ? "Rock"
      : computer === scissorsBtn
      ? "Scissors"
      : computer === paperBtn
      ? "Paper"
      : "Pick Again";

  let userImgChoice;
  let computerImgChoice;

  if (userPick === "Rock") {
    userImgChoice = "images/icon-rock.svg";
    userClass = "picked-rock";
  } else if (userPick === "Scissors") {
    userImgChoice = "images/icon-scissors.svg";
    userClass = "picked-scissors";
  } else if (userPick === "Paper") {
    userImgChoice = "images/icon-paper.svg";
    userClass = "picked-paper";
  }

  if (computerPick === "Rock") {
    computerImgChoice = "images/icon-rock.svg";
    computerClass = "picked-rock";
  } else if (computerPick === "Scissors") {
    computerImgChoice = "images/icon-scissors.svg";
    computerClass = "picked-scissors";
  } else if (computerPick === "Paper") {
    computerImgChoice = "images/icon-paper.svg";
    computerClass = "picked-paper";
  }

  results.innerHTML = `
<div class="userPickContainer">
<div class="userPick">YOU PICKED</div>
<button class='user-img'>
<img class="svg-img" src="${userImgChoice}">
</button>
</div>

<div class="hidden" id="you-win">
<p class="you-win-text">YOU WIN</p>
<button class="play-again">PLAY AGAIN</button>
</div>

<div class="hidden" id="you-lose">
<p class="you-lose-text">YOU LOSE</p>
<button class="play-again">PLAY AGAIN</button>
</div>

<div class="hidden" id="draw">
<p class="draw-text">DRAW</p>
<button class="play-again">PLAY AGAIN</button>
</div>

<div class="computerPickContainer">
<div class="computerPick">COMPUTER PICKED</div>
<button class='computer-img'>
<img class="svg-img" src="${computerImgChoice}">
</button>
</div>
`;

  const userImage = results.querySelector(".user-img");
  const computerImage = results.querySelector(".computer-img");

  userImage.classList.add(userClass);
  computerImage.classList.add(computerClass); 

  checkforwinner(userPick, computerPick)


  const playAgainBtns = results.querySelectorAll(".play-again");
  playAgainBtns.forEach((btn) => {
    btn.addEventListener("click", playAgain);
  });
};

function playAgain() {
  const results = document.querySelector(".results");
  results.remove();
  startingScreen.classList.remove("hidden");
};

function checkforwinner(user, computer){
  const youWin = document.querySelector('#you-win');
  const youLose = document.querySelector('#you-lose');
  const draw = document.querySelector('#draw');

  
  if(user === computer){
    draw.classList.remove('hidden')
  } else if(
    user === 'Rock' && computer === 'Scissors'
    || user === 'Scissors' && computer === 'Paper'
    || user === 'Paper' && computer === 'Rock'
  ){
    scoreCount++
    youWin.classList.remove('hidden')
    score.innerText = scoreCount;
  } else {
    youLose.classList.remove('hidden')
  }
}




// rule box functions
rulesBox.classList.add("hidden");

const closeRules = () => {
  if (!rulesBox.classList.contains("hidden")) rulesBox.classList.add("hidden");
};

const showRules = () => {
  if (rulesBox.classList.contains("hidden")) {
    rulesBox.classList.remove("hidden");
  }
};

// event listeners
closeButton.addEventListener("click", closeRules);
rulesBtn.addEventListener("click", showRules);

