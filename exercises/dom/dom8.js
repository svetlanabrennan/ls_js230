// Nested array of nodes
const nodes = ["BODY", [["HEADER", []], ["MAIN", []], ["FOOTER", []]]];
const nodes2 = ["BODY", [["DIV", [["DIV", []], ["DIV", [["DIV", []]]]]], ["DIV", []], ["DIV", [["DIV", []], ["DIV", []], ["DIV", []]]]]];


// OR
//
// [
//  "BODY", 
//  [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]
//  ]
// ]

function arrayToNodes(nodesArray) {
  let parent = document.createElement(nodesArray[0]);
  let children = nodesArray[1];

  if (children.length === 0) {
    return parent;
  } else {
    for (let idx = 0; idx < children.length; idx += 1) {
      parent.appendChild(arrayToNodes(children[idx]));

    }
  }
  return parent;
}

arrayToNodes(nodes);
