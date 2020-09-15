// Demonstrates various ways to manipulate strings and string methods.

// JS automatically converts numbers to strings in + operations.
var x = 1 + ' punch man'
console.log(x)
// This is identical to the concat() method.
// \n is newline.
console.log(x.concat('\nseason 2'))
var y = 'break \
strings up \
like this'
console.log(y)

// This is not true for other operations.
x = '11' + 1
console.log(x)
x = '11' - 1
console.log(x)
console.log()

// Strings can be converted back to numbers either using the + operator or the
// parseInt(string) and parseFloat(string) functions.
// Note that + also works on boolean operators, returning 1 for true and 0 for false.
x = '10' + '10'
console.log(x)
x = +'10' + parseInt('10')
console.log(x)
console.log()

// Strings act as immutable arrays and can be sliced.
var sentence = 'The quick brown fox jumps over the lazy dog.'
console.log('length:', sentence.length)
console.log('return indexed letter:', sentence[0])
// Same as above but returns '' instead of undefined if out of range.
console.log('return indexed letter2:', sentence.charAt(1))
// 2nd argument indicates start point. In this case it bypasses the first 'the'.
// Returns -1 if nothing is found.
console.log('return index of first instance:', sentence.indexOf('the', 10))
// search() method can use regex, which is indicated by /regex/ in js.
// Returns -1 if nothing is found.
console.log('search:', sentence.search(/[A-Z]\w+/gm))
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
var sentence2 = sentence.replace(/dog/, 'wolf')
// match() is like search but it returns the actual string instead of the index,
// and is able to return multiple matches as a list if the g flag is set.
console.log('match:', sentence2.match(/\w*[ae]+\w*/gmi))
console.log('replace:', sentence2)
console.log('uppercase:', sentence2.toUpperCase())
console.log('lowercase:', sentence2.toLowerCase())
console.log('repeat:', sentence2.repeat(2))
// Removes spaces from front and back, which in this case does nothing.
console.log('trim:', sentence2.trim())
console.log()

// Demonstrates split and join.
// split accepts use of regex.
var strArr = sentence.split(' ')
console.log('convert to array:', strArr)
console.log(strArr.join(' '))
console.log()

// Demonstrates formatting currencies.
var options = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 3
}
var goldPrice = new Intl.NumberFormat('en-US', options)
console.log(goldPrice.format(1234.567))
