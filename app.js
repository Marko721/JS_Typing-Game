// get words from api
// get random word from words array
// display word to the DOM

const word = document.getElementById("word");

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

// Generate random word from array
function getRandomWord() {
  getWords().then((words) => {
    let word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    return word;
  });
}

// Add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
