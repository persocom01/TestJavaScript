// Demonstrates timing methods that may be used with JS.

// There are two main methods used to affect timing in JS:
// setTimeout(function, milliseconds) - executes after milliseconds
// setInterval(function, milliseconds) - same as setTimeout but repeats after
// milliseconds.

// Stopping the timing uses two sister methods:
// clearTimeout()
// clearInterval()

// JS has no native sleep method. This is one way to get one.
const timer = ms => new Promise(resolve => setTimeout(resolve, ms))
const ms = 1000
const minTime = 2000

// console.time() and console.timeEnd() are native functions which can help time
// functions. However, they do not return any value.
console.time('console time')
// Using the difference between Date.now() allows you to get an execution time
// that can be returned.
var start = Date.now()
timer(ms).then(() => {
  var end = Date.now()
  var timeSpent = end - start
  console.log('time spent (s): ' + (timeSpent / 1000))

  if (timeSpent < minTime) {
    const addTime = minTime - timeSpent
    timer(addTime).then(() => console.timeEnd('console time'))
  }
})
