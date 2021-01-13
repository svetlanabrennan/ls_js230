/*
1. user clicks on nav link
2. user clicks on article element
3. user clicks on main page
*/

// solution 1
document.addEventListener("click", event => {
  let tag = event.target.tagName;

  removeHighlight();

  if (tag === "A") {
    let targetId = event.target.getAttribute("href");
    document.querySelector(targetId).classList.add("highlight");
  } else if (event.target.parentNode.tagName === "MAIN" || event.target.parentNode.tagName === "ARTICLE") {
    event.target.parentNode.classList.add("highlight");
  } else if (tag === "MAIN" || tag === "ARTICLE") {
    event.target.classList.add("highlight");
  }
});

function removeHighlight() {
  let allElementsHighlight = document.querySelectorAll(".highlight");
  allElementsHighlight.forEach(elm => elm.classList.remove("highlight"));
}

// solution 2 - course solution

function removeHighlight() {
  let highlighted = document.querySelector(".highlight");

  if (highlighted) {
    highlighted.classList.remove("highlight");
  }
}

function highlight({ target }) {
  let element;
  let id;

  removeHighlight();

  if (target.tagName === "A") {
    id = target.getAttribute("href");
    element = document.querySelector(id);
  } else {
    element = document.querySelector("main");
  }

  element.classList.add("highlight");
}

let nav = document.querySelector("header ul");
let main = document.querySelector("main");

nav.addEventListener("click", highlight);
document.addEventListener("click", highlight);
main.addEventListener("click", event => {
  event.preventDefault();
  let article = event.target;
  if (article.tagName !== "ARTICLE") {
    article = article.parentNode;
  }

  if (article.tagName === "ARTICLE") {
    event.stopPropagation();
    removeHighlight();
    article.classList.add("highlight");
  }
});
