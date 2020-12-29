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