// Demonstrates if statements and logical operators.
var input = 107
// || = OR. This used to be a common way to set default values. || will reject
// any argument that evalutaes as false. This includes:
// false, 0, null, undefined, '' and NaN.
input = input || 0
// If you explicitly want to reject undefined arguments, use:
if (input === undefined) input = 0

var checkedInput = (input < -100 || input > 100) ? 'input is out of scope' : input
var allowNegative = false

// typeof is covered under operators.
if (typeof checkedInput === 'string') {
  console.log(checkedInput)
// && = AND and ! = NOT
} else if (checkedInput < 0 && !allowNegative) {
  console.log('input cannot be negative')
} else {
// Adding a number to a strong concatenates both as a string.
  console.log(input + ' passes the tests.')
}

// Demonstrates the switch statement.
switch (checkedInput) {
  // Strings can also be used as cases, such as case 'apple':.
  case 7:
    console.log('you picked the lucky number seven!')
    // break is neccessary or it will continue to the next case.
    break
  case 13:
    console.log('you picked the unlucky number thirteen!')
    break
  default:
    console.log('you picked an ordinary number.')
}
