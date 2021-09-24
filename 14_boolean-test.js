// Demonstrates various functions and methods related to boolean values.

// Demonstrates various ways to create a boolean.
var t = true
var f = (0 === 1)
// A value parameter that is omitted, 0, -0, null, false, NaN, undefined, or an
// empty string ('') will be evaluated as false.
var boolObj = new Boolean('')
console.log('boolean object:', boolObj)
// Convert boolObj to bool.
console.log('normal bool:', boolObj.valueOf())
// However it is not recommended to create a boolean object because it is
// considered an object and for the purpose of if statements, is evaluated as
// true.
console.log('type:', typeof boolObj)

if (boolObj) {
  console.log('boolean objects are always evaluated as true in if statements')
  console.log()
}

// When used in calculations, booleans take the value of 1 for true and 0 for
// false.
var x = t + f + 10
console.log('bool + int:', x)
// Booleans are always converted to 'true' and 'false' as strings.
x = true.toString() + ' ' + false
console.log('bool as string:', x)
