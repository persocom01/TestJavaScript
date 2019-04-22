// Demonstrates functions.

// Demonstrates a function capable of taking in multiple arguments using
// the special arguments object.
function greet () {
  for (var i in arguments) {
    console.log('Hello', arguments[i])
  }
}

greet('Al', 'Ben')

// Demonstrates a simple anonymous function.
// This part only works on test webpage.
document.querySelector('html').onclick = function () {
  alert('click test')
}
