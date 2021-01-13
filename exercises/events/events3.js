/*
> let sectionElement = document.querySelector('section');
> makeBold(sectionElement, function(elem) {
    elem.classList.add('highlight');
  });

> sectionElement.classList.contains('highlight');
= true
> sectionElement.style.fontWeight;
= "bold"

make element bold
let user do other things to element

*/

function makeBold(elmentItem, callback) {
  elmentItem.style.fontWeight = "bold";
  callback(elmentItem);
}

// further explorations
const elementItem = document.querySelector('section');

function makeBold(elementItem) {
  elementItem.style.fontWeight = "bold";
  const event = new CustomEvent("bolded");

  elementItem.dispatchEvent(event);
}

elementItem.addEventListener("bolded", (event) => {
  alert(event.target.tagName);
  event.target.classList.add("highlight");
});

makeBold(sectionElement);