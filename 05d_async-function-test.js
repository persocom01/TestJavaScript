// Demonstrates asynchronous functions.
// async functions return an implicit promise, and the webpage does not need
// them to complete when it is loaded.
// async functions are useful when execution of a function is not expected to
// complete when the webpage is initially loaded. It allows the function to
// make changes to the page after the rest of the page has completed loading.

function returnHomeCoinFlip () {
  return new Promise((resolve, reject) => {
    const s = Math.round(Math.random())

    switch (s) {
      case 1:
        console.log('heads')
        document.querySelector('#output').textContent = 'you will be redirected home after 2 secs.'
        setTimeout(() => {
          resolve(window.location.href = './index.html')
        }, 2000)
        break
      case 0:
        // To do something on reject, put it in the promise's catach block.
        reject(new Error('flipped tails'))
        break
      default:
        console.log('[async] switch not working')
    }
  })
}

// await is a keyword that is only used in async functions. One can think of
// it as the async version of return, the difference being that it waits for
// a promise to complete before returning the completed value. One can still
// use return in async functions. It just means that the function won't be
// waiting for anything and will just return whatever it is immediately.
async function asyncCall () {
  await returnHomeCoinFlip().catch(() => {
    console.log('tails')
    document.querySelector('#output').textContent = 'you will be redirected home after 5 secs.'
    setTimeout(() => {
      window.location.href = './index.html'
    }, 5000)
  })
}

asyncCall()
