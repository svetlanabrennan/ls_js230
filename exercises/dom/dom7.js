/*
input: html
output: nested array

rules:
start at body element
for each parent element do this:
  log parent node name
  get all children of the parent and log the parent name and it's children in the array
  repeat for all nested children

  if a parent has no children, return a []

notes:
  can we use walk function here

algo:
  create an empty result array
  get the name of the parent element => start with body => push to result array
  get the children of the body element and store in array and push to result array
  map through the result array
    if element is an array do this:
      map again through each children in the array
        create empty array
        get the name of the child and push to empty array
        get the children of the child and turn into array and push to empty array
        push array to result array
    else do nothing (because it's the body element)

*/

// first solution
function nodesToArr() {
  let result = [];

  result.push(document.body.tagName);
  let children = Array.prototype.slice.call(document.body.children);
  result.push(children);

  return result.map(node => {
    if (Array.isArray(node)) {
      return getChildren(node);
    } else {
      return node;
    }
  });
}

function getChildren(array) {
  return array.map(child => {
    let arr = [];
    arr.push(child.tagName);
    let children = child.children;
    let childrenArr = Array.prototype.slice.call(children);

    let repeated = false;
    while (childrenArr.length > 0) {
      let arrCopy = childrenArr.slice(0, 1);
      childrenArr.shift();
      let result = getChildren(arrCopy);
      arr.push(result);
      repeated = true;
    }

    if (!repeated) {
      arr.push(childrenArr);
    }

    return arr;
  });
}


// refactored 
function nodesToArr(baseNode) {
  let result = [baseNode, []];
  let children = baseNode.children;

  for (let idx = 0; idx < children.length; idx += 1) {
    let child = children[idx];
    result[1].push(nodesToArr(child));
  }
  return result;
}