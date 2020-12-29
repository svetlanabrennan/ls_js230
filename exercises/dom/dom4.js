function sliceTree(start, end) {
  let startElement = document.getElementById(start);
  let endElement = document.getElementById(end);

  if (!startElement || !endElement) {
    return undefined;
  }

  let result = [];
  let currElement;

  do {
    currElement = endElement;
    result.unshift(currElement.tagName);
    endElement = endElement.parentNode;
  } while (currElement.id !== String(start) && endElement.tagName !== "BODY");

  return endElement.tagName === "BODY" && currElement.id !== String(start) ? undefined : result;
}