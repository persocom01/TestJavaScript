// Demonstrates various functions and methods related to numbers.

// Most are self explanatory.
console.log(Number.MAX_VALUE)
console.log(Number.MIN_VALUE)
console.log(Number.NaN)
console.log(Number.NEGATIVE_INFINITY)
console.log(Number.POSITIVE_INFINITY)
// Smallest possible difference between numbers.
console.log(Number.EPSILON)
console.log(Number.MIN_SAFE_INTEGER)
console.log(Number.MAX_SAFE_INTEGER)
console.log()

// Turns a string into a number.
console.log(parseFloat('1.6'))
// Note that it floors the int.
console.log(parseInt('1.6'))
console.log(Number.isFinite(-Infinity))
// Note that string integers return false.
console.log(Number.isInteger('1'))
// Returns true because the string cannot be converted to a number.
console.log(Number.isNaN(+'string'))
// A non-integer will also return false.
console.log(Number.isSafeInteger(1.6))
console.log()

// Demonstrates number methods.
var num = 123456.789
// (int) Determines number of decimal places.
console.log(num.toExponential(4))
// (int) Determines number of decimal places.
console.log(num.toFixed(2))
// (int) Determines number of significant figures.
console.log(num.toPrecision(3))