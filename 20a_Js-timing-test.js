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

// console.time() and console.timeEnd() are native functions which can help time
// functions. However, they do not return any value.
console.time('console time')
// Using the difference between Date.now() allows you to get an execution time
// that can be returned.
var start = Date.now()
timer(2000).then(() => {
  var end = Date.now()

  var timeSpent = (end - start) / 1000
  console.log('time spent: ' + timeSpent)
  console.timeEnd('console time')
})
