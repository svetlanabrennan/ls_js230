function colorGeneration(target) {
  let elements;
  let generation = 0;
  let parents = [document.body];

  while (generation < target) {
    generation += 1;
    elements = getAllChildrenOf(parents);
    parents = elements;
  }

  if (elements) {
    color(elements);
  }

}

function color(elements) {
  elements.forEach(({ classList }) => {
    classList.add("generation-color");
  });
}

function getAllChildrenOf(parents) {
  return parents.map(({ children }) => Array.prototype.slice
    .call(children))
    .reduce((collection, children) => collection.concat(children), []);
}

// without object destructuring
// function getAllChildrenOf(parents) {
//   return parents.map(parent => {
//     let children = parent.children;
//     return Array.prototype.slice.call(children)
//   }).reduce((collection, children) => collection.concat(children), []);
// }

function getAllChildrenOf(parents) {
  return parents.map(({ children }) => Array.prototype.slice.call(children))
}