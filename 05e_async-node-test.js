// Demonstrates async functions in node.js.

// Demonstrates a promise that returns heads or tails when resolved.
function coinFlip () {
  return new Promise((resolve, reject) => {
    const s = Math.round(Math.random())
    switch (s) {
      case 1:
        // resolve is not considered break or return, and thus must be used
        // with break in a switch.
        resolve('heads')
        break
      case 0:
        resolve('tails')
        break
      default:
        console.log('[async] switch not working')
    }
  })
}

// Even if return is used, the return value is a promise and not the result of
// the promise.
async function asyncCall () {
  const result = await coinFlip()
  console.log('result: ' + result)
  return result
}

console.log(asyncCall())
