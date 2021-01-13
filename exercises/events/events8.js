// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({ target, currentTarget }) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

function delegateEvent(parent, selector, event, callback) {
  if (parent && parent instanceof Element) {
    return !parent.addEventListener(event, event => {
      let validTargets = Array.prototype.slice.call(parent.querySelectorAll(selector));
      console.log(validTargets);
      if (validTargets.includes(event.target)) {
        callback(event);
      }
    });
  }
}