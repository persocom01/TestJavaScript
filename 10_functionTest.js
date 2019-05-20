// Demonstrates functions.

// Demonstrates a function expression with a simple anonymous function.
// Unlike normal functions, function expressions work like variables in that
// they are not hoisted to the top when code is run.
var square = function (number) { return number * number }
// Demonstrates an arrow function expression equivalent of the above.
// Arrow functions with only 1 argument do not require ().
// However, arrow functions with no arguments must be written as:
// () => do something.
// Multiple arguments are written as:
// (arg1, arg2, ...args) => do something.
var squareArrow = number => number * number
var fourSquare = square(4)
var eightSquareArrow = squareArrow(8)
console.log('anon function:', fourSquare)
console.log('arrow function:', eightSquareArrow)

// Demonstrates a function expression with a named function.
// Also demonstrates possing function expressions to a function.
var factorial = function fac (n) { return n < 2 ? 1 : n * fac(n - 1) }
var inputArray = [ 3, 5, 7 ]

function map (fun, arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result[i] = fun(arr[i])
  }
  console.log(result)
}
map(factorial, inputArray)
// The above is actually identical to arry method map:
console.log(inputArray.map(factorial))

// Demonstrates nested functions.
// Breaking down functions into partial functions which take only 1 argument
// each is called currying.
// Also demonstrates setting default value.
function greetCurried (greeting = 'Hi') {
  // In the case of a variable name conflict between inner and outer functions,
  // the inner function will take the value of the inner function variable.
  // Not demonstrated here, but a conflict would arise if it were written as
  // function nameCurried (greeting)
  function nameCurried () {
    // Inner functions may use variables from outer functions.
    // Demonstrates the special arguments object which allows accepting
    // multiple aguments.
    var output = ''
    for (var i in arguments) {
      output += greeting + ' ' + arguments[i]
      // Adds a line break if not the last argument.
      if (i < arguments.length - 1) {
        output += '\n'
      }
    }
    return output
  }
  return nameCurried
}
var greetHi = greetCurried()
console.log(greetHi('Aruru'))
// Passing arguments to curried functions is done via function(arg1)(arg2)
// instead of function(arg1, arg2)
console.log(greetCurried('Hello there')('Eruru', 'Urutori'))
console.log()

// Multiple arguments can also be passed using ....
function classList (classname, ...students) {
  var output = classname + '\n'
  for (var i in students) {
    output += students[i]
    if (i < students.length - 1) {
      output += '\n'
    }
  }
  return output
}
console.log(classList('1-D', 'Yuzuha', 'Touka'))
console.log()

// Demonstrates how to name function arguments.
function burger ({
  bun = 'bread',
  patty,
  others = { sauce: 'ketchup', veg: 'lettuce' }
// Without = {}, an error will occur when no arguments are passed.
} = {}) {
  // Demonstrates how to return multiple variables.
  return [bun, patty, others]
}
// Demonstrates how to pass values into named arguments.
console.log(burger({ bun: 'rice', patty: 'fish', others: { sauce: 'mayonnaise' } }))

// Demonstrates how to retrieve object properties using functions.
var beefBurger = { bun: 'bread', patty: 'beef' }
function pattyType ({ patty: p }) {
  return p
}
console.log(pattyType(beefBurger))
