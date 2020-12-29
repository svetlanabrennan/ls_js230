/*
input: integer - element's id
output: nested array - [[], [], []...etc]
rules:

  first subarray contains the element (with the input id) and it's siblings
  second subarray contains the parent of the element and its siblings

  repeat this until you reach the last parent element with id of 1
*/

function domTreeTracer(id) {
  let result = [];
  let currElement = document.getElementById(id);
  let parentElement;

  do {
    parentElement = currElement.parentNode;
    let children = Array.prototype.slice.call(parentElement.children);
    children = children.map(child => child.nodeName);
    result.push(children);

    currElement = parentElement;
  } while (parentElement.id !== "");

  return result;
}