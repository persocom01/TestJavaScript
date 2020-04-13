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

async function asyncCall () {
  console.log('calling')
  await returnHomeAfter2Seconds()
}

asyncCall()
