// Demonstrates asynchronous functions.
// Asynchronous functions return an implicit promise, and the webpage does not
// need them to complete when it is loaded.

function returnHomeAfter2Seconds () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(window.location.href = './index.html')
    }, 2000)
  })
}

// await is a keyword that is only used in async functions. One can think of
// it as the async version of return, the difference being that it waits for
// a promise to complete before returning the completed value. One can still
// use return in async functions. It just means that the function won't be
// waiting for anything and will just return whatever it is immediately.
async function asyncCall () {
  console.log('calling')
  await returnHomeAfter2Seconds()
}

asyncCall()
