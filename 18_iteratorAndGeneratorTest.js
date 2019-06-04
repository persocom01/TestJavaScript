// Demonstrates the use of iterators and generators.

// Generator functions are denoted by function *.
// They return a generator object and use yield keyword instead of return.
// A generator object is not an array and generator[index] does not work on it.
function * rangeIterator (start = 0, end = 10, step = 1) {
  // Handles invalid input with an error.
  if (step <= 0) {
    throw Error('Step cannot be smaller or equal to zero.')
  }
  for (var i = start; i < end; i += step) {
    // You may yield more than once in the same function.
    yield i
  }
}

// There are two ways to access the results of a generator object.
// The first is using a for... of loop.
for (var n of rangeIterator(0, 3, 1)) {
  console.log('generator:', n)
}
// The second is to turn it into an array using [...generator]
console.log('as array:', [...rangeIterator(0, 3, 1)])
console.log()

// Demonstrates how to build your own iterable although I don't know what the
// practical value of this is.
var myIterable = {
  * [Symbol.iterator] () {
    // You may yield an iterable using yield *.
    yield * [...rangeIterator(8, 11, 1)]
  }
}
console.log('myIterable:', [...myIterable])
console.log()

function * wordIterator (word = '') {
  var i = 0
  while (i < word.length) {
    var current = i
    // var = yield is important when using the .next(value) method.
    // The value passed to next() is passed to var.
    // What yield actually returns is unimportant.
    var setting = yield word[current]
    if (typeof setting === 'number') {
      i = setting
    } else {
      i++
    }
  }
}
var sequence = wordIterator('cake')
// The first value passed to next is always ignored.
// That's why the first statement doesn't work.
console.log(sequence.next(3).value)
console.log(sequence.next(3).value)
console.log(sequence.next(0).value)
console.log(sequence.next().value)
