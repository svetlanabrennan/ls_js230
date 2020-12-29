/*
<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

outer div: has 9 direct child nodes 12 indirect child nodes
h1: has 2 direct child nodes and 1 indirect child node
h1 > em: has 1 direct child node and 0 indirect child node
p: has 3 direct child nodes and 1 indirect child node
p > span: has 1 direct child node and 0 indirect node
a: has 1 direct child node and 1 indirect child node
a > strong: has 1 direct child node and 0 indirect child node
inner div: has 1 direct child nodes and 2 indirect child node
div > p: 1 direct child node and 1 indirect child node
div > p > a: 1 direct child node and 0 indirect child node
*/

function childNodes(nodeValue) {
  let direct = document.getElementById(`${nodeValue}`).childNodes;
  let indirect = 0;

  for (let idx = 0; idx < direct.length; idx += 1) {
    walk(direct[idx], node => indirect += node.childNodes.length);
  }

  return [direct.length, indirect];
}

function walk(node, callback) {
  callback(node);     // do something with node

  if (node.childNodes.length > 0) {
    for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
      walk(node.childNodes[index], callback);   // recursively call walk()
    }
  }

}


