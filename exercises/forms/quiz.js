const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

document.addEventListener("DOMContentLoaded", () => {
  let questionsTemplate = Handlebars.compile(document.querySelector("#questionTemplate").innerHTML);
  renderQuestions(questionsTemplate);

  let form = document.querySelector("form");
  form.addEventListener("submit", event => {
    event.preventDefault();

    document.querySelector("#submit").disabled = true;
    document.querySelector("#reset").classList.add("reset_btn");
    renderResult();
  });

  let resetBttn = document.querySelector("#reset");
  resetBttn.addEventListener("click", event => {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#reset").classList.remove("reset_btn");
    resetResults();
  });

});

function renderResult() {
  document.querySelectorAll(".question").forEach(question => {
    let selectedAns = question.querySelector("input:checked");
    let status;
    let questionNum;

    if (selectedAns) {
      questionNum = selectedAns.name;
      if (answerKey[questionNum] === selectedAns.value) {
        status = "correct";
      } else {
        status = "incorrect";
      }
    } else {
      questionNum = question.querySelector("input").name;
      status = "incorrect";
    }

    let result = question.querySelector("#result");
    displayResults(result, answerKey[questionNum], status);
  });
}

function renderQuestions(template) {
  questions.forEach(question => {
    document.querySelector("fieldset").insertAdjacentHTML("beforeend", template(question))
  });
}

function displayResults(result, answer, status) {
  if (status === "correct") {
    result.textContent = "Correct Answer";
    result.classList.add("correct");
  } else {
    result.textContent = `Wrong Answer. The correct answer is "${answer}".`;
    result.classList.add("incorrect");
  }
}

function resetResults() {
  document.querySelectorAll("#result").forEach(item => {
    item.textContent = "";
    item.classList.remove("incorrect", "correct");
  });
}
