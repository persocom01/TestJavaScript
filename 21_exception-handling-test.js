// Demonstrates error handling.
function CustomError (message) {
  this.name = 'CustomError'
  this.message = message
}

// Automatically runs when exception is thrown.
CustomError.prototype.toString = function () {
  return this.name + ': "' + this.message + '"'
}

function countToTen (number) {
  if (number > 10) {
    // You can throw strings, numbers, or even boolean.
    // You can also make use of a prebuilt error constructor by using:
    // throw new Error('message') or throw Error('message').
    // The error constructor comes with two properties, Error.name and
    // Error.message.
    throw new CustomError(number + ' is out of scope.')
  } else {
    var arr = []
    for (var i = number; i <= 10; i++) {
      arr.push(number)
    }
    return arr
  }
}

// Demonstrates try, catch and finally.
function tryWrapper (num) {
  try {
    countToTen(num)
  // catch catches errors, which in this case is defined as e.
  } catch (e) {
    // console.error() is functionally identical to console.log() in most cases,
    // but can be used to print messages to a different stream.
    console.error('error encountered!:')
    // throw e is known as re-throwing the error, since catch statements are
    // meant to perform something in the case of an error.
    // Re-throwing the error can be useful is you want it to be caught again
    // in an outer try catch block.
    throw e
  } finally {
    // return in the finally block overriddes return or throw in the other blocks.
    // return null
  }
}

console.log(tryWrapper(11))
