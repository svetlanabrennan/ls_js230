document.addEventListener("DOMContentLoaded", () => {

  let button = document.querySelector("input[type=submit]");

  button.addEventListener("click", event => {
    event.preventDefault();
    let first = Number(document.getElementById("first-number").value);
    let second = Number(document.getElementById("second-number").value);
    let operator = document.getElementById("operator").value;
    let total;

    switch (operator) {
      case "+":
        total = first + second;
        break;
      case "-":
        total = first - second;
        break;
      case "/":
        total = first / second;
        break;
      case "*":
        total = first * second;
    }

    let result = document.getElementById("result");
    result.textContent = total;
  });


});