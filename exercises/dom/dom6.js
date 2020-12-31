/*
input: two integers - element ids
output: true or undefined


if one of the ids doesn't exist return undefined
if one of the nods is a child of the other node return undefined
*/

function nodeSwap(target1, target2) {
  let first = document.getElementById(target1);
  let second = document.getElementById(target2);

  if (!first || !second) {
    return undefined;
  }

  if (checkChildren(first, target2) || checkChildren(second, target1)) {
    return undefined
  }

  let firstClone = first.cloneNode(true);
  let secondClone = second.cloneNode(true);

  first.parentNode.replaceChild(secondClone, first);
  second.parentNode.replaceChild(firstClone, second);

  return true;
}

function checkChildren(node, otherId) {
  let children = Array.prototype.slice.call(node.children);
  return children.some(element => element.id === String(otherId));
}

// further explorations
function nodeSwap(target1, target2) {
  let first = document.getElementById(target1);
  let second = document.getElementById(target2);

  if (!first || !second) {
    return undefined;
  }

  if (checkChildren(first, target2) || checkChildren(second, target1)) {
    return undefined
  }

  let firstClone = first.cloneNode(true);
  let secondClone = second.cloneNode(true);

  first.insertAdjacentElement("beforebegin", firstClone);
  second.insertAdjacentElement("beforebegin", secondClone);

  firstClone.parentElement.replaceChild(second, firstClone)
  secondClone.parentElement.replaceChild(first, secondClone)

  return true;
}

function checkChildren(node, otherId) {
  let children = Array.prototype.slice.call(node.children);
  return children.some(element => element.id === String(otherId));
}
