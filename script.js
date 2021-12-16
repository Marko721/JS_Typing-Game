// connect to a api to get random words
// when you type a letter perform a check to the word green if it's correct red orange if it's not
// display 3 rows of 5 words so you can see ahead for faster typing
"use strict";

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

const getWords = async () => {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=10&swear=0 "
  );

  if (response.status !== 200) {
    throw new Error("cannot fetch the data");
  }

  const data = await response.json();
  return data;
};

const getWord = () => {
  getWords().then((words) => {
    let word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    addWordToDom(word);
  });
};

getWord();

// Add word to DOM
function addWordToDom(str) {
  randomWord = str;
  word.innerHTML = str;
}

// Set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on input on start
text.focus();

// Start counting down to run updateTime function every second
const timeInterval = setInterval(updateTime, 1000);

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// Game over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

// Event listeners

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    getWord();
    updateScore();

    // Clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
  }
});

// Settings  btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings select
settings.addEventListener("change", (e) => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
  // settings.classList.toggle("hide");
});
