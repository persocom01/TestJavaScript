// Demonstrates functions.

// Demonstrates a function capable of taking in multiple arguments using
// the special arguments object.
function greet () {
  for (var i in arguments) {
    console.log('Hello', arguments[i])
  }
}

greet('Al', 'Ben')

// Demonstrates a function expression with a simple anonymous function.
var square = function (number) { return number * number }
var fourSquare = square(4)
console.log('anon function:', fourSquare)

// Demonstrates a function expression with a named function.
// Also demonstrates possing function expressions to a function.
var factorial = function fac (n) { return n < 2 ? 1 : n * fac(n - 1) }
var inputArray = [ 3, 5, 7 ]

function map (fun, arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result[i] = fun(arr[i])
  }
  return result
}
console.log(map(factorial, inputArray))
