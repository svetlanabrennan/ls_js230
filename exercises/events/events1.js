function randomizer(...callbacks) {

  if (callbacks.length < 1) {
    return;
  }

  let timer = 2 * callbacks.length;

  let count = 0;

  let logger = setInterval(() => {
    count += 1;
    console.log(count);

    if (count >= timer) {
      clearInterval(logger);
    }
  }, 1000);

  callbacks.forEach(callback => {
    let timeout = Math.floor(Math.random() * timer * 1000);
    setTimeout(callback, timeout);
  });
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);
