// JS automatically converts numbers to strings in + operations.
var x = 1 + ' punch man'
console.log(x)

// This is not true for other operations.
x = '11' + 1
console.log(x)
x = '11' - 1
console.log(x)

// Strings can be converted back to numbers using the + operator.
x = '10' + '10'
console.log(x)
x = +'10' + +'10'
console.log(x)
