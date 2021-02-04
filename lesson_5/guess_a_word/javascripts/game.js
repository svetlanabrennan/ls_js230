// for each word to guess, get the length and use that to add span elements to spaces div

document.addEventListener("DOMContentLoaded", () => {
  let guesses = 0;

  let selectedWord = randomWord()
  let wordLength = selectedWord.length;
  console.log(wordLength);

  for (let i = 0; i < wordLength; i += 1) {
    let div = document.createElement("span");
    document.querySelector("#spaces").appendChild(div);
  }


  document.addEventListener("keydown", event => {
    console.log(event.key)
  });
});

var randomWord = function () {
  let words = ['apple', 'banana', 'orange', 'pear', 'strawberries'];

  return function () {
    let word = words[Math.floor(Math.random() * words.length)];
    words.splice(words.indexOf(word), 1);
    return word;
  };
}();