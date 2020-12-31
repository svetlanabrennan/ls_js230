/*
1. 
*/

function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

delayLog();

/*
2. In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

*/

setTimeout(() => { //1
  console.log('Once'); //5
}, 1000);

setTimeout(() => { //2
  console.log('upon'); //7
}, 3000);

setTimeout(() => { //3
  console.log('a'); //6
}, 2000);

setTimeout(() => { //4
  console.log('time'); //8
}, 4000);

/*
3. In what sequence does the JavaScript runtime run the functions q, d, n, z, s, f, and g in the following code?
*/

setTimeout(() => {
  setTimeout(() => {
    q();
  }, 15); //7

  d(); //3

  setTimeout(() => {
    n();
  }, 5); //5

  z(); //4
}, 10);

setTimeout(() => {
  s(); // 6
}, 20);

setTimeout(() => {
  f();  //2
});

g(); // 1

// g f d z n q s


/*
4. Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. The function should wait for the indicated period, then invoke the callback function.
*/

function afterNSeconds(callback, timeSeconds) {
  setTimeout(callback, timeSeconds * 1000);
}