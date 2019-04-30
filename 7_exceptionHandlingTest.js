// Demonstrates error handling.
function CustomException (message) {
  this.message = message
  this.name = 'CustomException'
}

// Atomatically runs when exception is thrown.
CustomException.prototype.toString = function () {
  return this.name + ': "' + this.message + '"'
}

function countToTen (number) {
  if (number > 10) {
    // You can throw strings, numbers, or even boolean.
    throw new CustomException(number + ' is out of scope.')
  } else {
    var arr = []
    for (var i = number; i <= 10; i++) {
      arr.push(number)
    }
    return arr
  }
}

function tryWrapper (num) {
  try {
    countToTen(num)
  } catch (e) {
    throw e
  } finally {
    // return in the finally block overriddes return or throw in the other blocks.
    // return null
  }
}

console.log(tryWrapper(11))
