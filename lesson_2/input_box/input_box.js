let cursor;
let focusedText;

document.addEventListener("DOMContentLoaded", () => {
  let textField = document.querySelector(".text-field");

  textField.addEventListener("click", event => {
    event.stopPropagation();

    focusedText = textField;
    textField.classList.add("focused");

    cursor = cursor || setInterval(() => textField.classList.toggle('cursor'), 500);
  });
});

document.addEventListener("keydown", event => {
  if (focusedText) {
    let contentDiv = focusedText.querySelector(".content");

    if (event.key === "Backspace") {
      contentDiv.textContent = contentDiv.textContent.slice(0, contentDiv.textContent.length - 1);
    } else if (event.key.length === 1) {
      contentDiv.textContent = contentDiv.textContent + event.key;
    }
  }
});

document.addEventListener("click", event => {
  clearInterval(cursor);
  if (focusedText) {
    focusedText.classList.remove("focused");
    focusedText.classList.remove("cursor");
    focusedText = null;
  }
});

