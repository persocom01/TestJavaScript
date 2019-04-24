// Demonstrates various ways to manipulate strings and string methods.

// JS automatically converts numbers to strings in + operations.
var x = 1 + ' punch man'
console.log(x)
// This is identical to the concat() method.
console.log(x.concat(' ', 'season 2'))

// This is not true for other operations.
x = '11' + 1
console.log(x)
x = '11' - 1
console.log(x)
console.log()

// Strings can be converted back to numbers using the + operator.
x = '10' + '10'
console.log(x)
x = +'10' + +'10'
console.log(x)
console.log()

// Strings act as immutable arrays and can be sliced.
var sentence = 'The quick brown fox jumps over the lazy dog.'
console.log('length:', sentence.length)
console.log('return indexed letter:', sentence[0])
// Same as above but returns '' instead of undefined if out of range.
console.log('return indexed letter2:', sentence.charAt(1))
// 2nd argument indicates start point. In this case it bypasses the first 'the'.
console.log('return index of first instance:', sentence.indexOf('the', 10))
// search() method can use regex.
console.log('search:', sentence.search('the'))
console.log('return index of last instance:', sentence.lastIndexOf('fox'))
// You can also slice from the end of the string using -ve numbers.
// Leaving out the 2nd argument return the rest of the string.
// A second method, substring() is similar to slice with a few differences.
// Most notably -ve numbers === 0.
console.log('slice:', sentence.slice(16, 19))
// substr() uses length as second argument instead of endpoint.
console.log('substr:', sentence.substr(16, 3))
console.log()

// Other methods.
var sentence2 = sentence.replace('dog', 'wolf')
console.log('replace:', sentence2)
console.log('uppercase:', sentence2.toUpperCase())
console.log('lowercase:', sentence2.toLowerCase())
// Removes spaces from front and back, which in this case does nothing.
console.log('trim:', sentence2.trim())
console.log()

var strArr = sentence.split(' ')
console.log('convert to array:', strArr)
