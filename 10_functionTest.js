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
// Unlike normal functions, function expressions work like variables in that
// they have to be declared before use and are not automatically run first
// regardless of position in the code.
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

// Demonstrates nested functions.
// Breaking down functions into partial functions which take only 1 argument
// each is called currying.
function greetCurried (greeting) {
  // In the case of a variable name conflict between inner and outer functions,
  // the inner function will take the value of the inner function variable.
  // Not demonstrated here, but a conflict would arise if it were written as
  // function nameCurried (greeting)
  function nameCurried (name) {
    // Inner functions may use variables from outer functions.
    return greeting + ' ' + name
  }
  return nameCurried
}
var greetHi = greetCurried('Hi')
console.log(greetHi('Eruru'))
// Passing arguments to curried functions is done via function(arg1)(arg2)
// instead of function(arg1, arg2)
console.log(greetCurried('Hello there')('Shiori'))
