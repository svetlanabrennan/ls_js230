document.addEventListener("DOMContentLoaded", () => {
  let guesses = document.querySelector("#guesses");
  let play = document.querySelector("#play");
  let apples = document.querySelector("#apples");
  let status = document.querySelector("#status");
  let spaces = document.querySelector("#spaces");

  let randomWord = function () {
    let words = ['apple', 'banana', 'orange', 'pear', 'strawberries'];

    return function () {
      let word = words[Math.floor(Math.random() * words.length)];
      words.splice(words.indexOf(word), 1);
      return word ? word.split("") : word;
    };
  }();

  class Game {
    constructor() {
      this.word = randomWord();
      this.incorrectGuesses = 0;
      this.lettersGuessed = [];
      this.allowedGuesses = 6;

      if (!this.word) {
        this.outOfWords();
        return this;
      }

      this.reset();
    }

    bind() {
      this.processGuessHandler = (e) => this.handleKeyUp(e);
      document.addEventListener("keyup", this.processGuessHandler);
    }

    unbind() {
      document.removeEventListener("keyup", this.processGuessHandler);
    }

    reset() {
      this.bind();
      this.createBlanks();
      this.clearGuesses();
      this.setClass();
      this.hideReplayLink();
      status.textContent = "";
    }

    createBlanks() {
      let spans = document.querySelectorAll("#spaces span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });

      this.word.forEach(chr => {
        let div = document.createElement("span");
        spaces.appendChild(div);
      });
    }

    clearGuesses() {
      let spans = guesses.querySelectorAll('span');
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
    }

    setClass() {
      apples.classList.remove(...apples.classList);
      apples.classList.add("guess_" + this.incorrectGuesses);
    }

    showReplayLink() {
      play.classList.remove("hide");
      play.classList.add("show");
    }

    hideReplayLink() {
      play.classList.remove("show");
      play.classList.add("hide");
    }

    addLetterToGuesses(chr) {
      let span = document.createElement("span");
      span.textContent = chr.toUpperCase();
      guesses.appendChild(span);
    }

    findLocationOfLetters(chr) {
      let indexes = [];
      this.word.forEach((letter, idx) => {
        if (letter === chr) {
          indexes.push(idx + 1);
        }
      });
      return indexes;
    }

    addLetterToWord(indexes, chr) {
      indexes.forEach(index => {
        spaces.children.item(index).textContent = chr.toUpperCase();
      });
    }

    isLetter(chr) {
      return chr.charCodeAt(0) >= 97 && chr.charCodeAt(0) <= 122
    }

    handleKeyUp(event) {
      let chr = event.key
      if (this.isLetter(chr)) {
        if (!this.lettersGuessed.includes(chr)) {
          this.lettersGuessed.push(chr);
          this.addLetterToGuesses(chr);

          if (this.word.includes(chr)) {
            this.addLetterToWord(this.findLocationOfLetters(chr), chr);
          } else {
            this.incorrectGuesses += 1;
            this.setClass();
          }
        }
      }

      if (this.wordCompleted()) {
        this.win();
      } else if (this.incorrectGuesses === 6) {
        this.lose();
      }
    }

    wordCompleted() {
      let wordsSpan = Array.from(spaces.children);
      return wordsSpan.every(child => child.textContent !== "");
    }

    displayMessage(text) {
      status.textContent = text;
    }

    outOfWords() {
      status.textContent = "Sorry, I've run out of words!";
      this.unbind();
      this.hideReplayLink();
    }

    win() {
      this.unbind();
      this.displayMessage("You win!")
      this.showReplayLink();
    }

    lose() {
      this.unbind();
      this.displayMessage("Sorry! You're out of guesses");
      this.showReplayLink();
    }
  }

  new Game();

  play.addEventListener("click", function (e) {
    e.preventDefault();

    new Game();
  });

});