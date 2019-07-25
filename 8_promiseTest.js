// Demonstrates use of promises.
// Promises are objects that execute upon the completion or failure to
// complete of an operation.

class PromiseClass {
  constructor () {
    this.url = './images/Mika%20sit.png'
  }
  getImage (url) {
    // The promise constructor takes in a single argument; a callback with
    // two function as arguments; resolve for if the operation worked, reject if
    // it did not.
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest()
      request.open('GET', url)
      // In the case of an image, set responseType to blob for binary data.
      request.responseType = 'blob'
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response)
        } else {
          reject(Error('Load unsuccessful, error code:' + request.statusText))
        }
      }
      request.onerror = function () {
        reject(Error('There was a network error.'))
      }
      request.send()
    })
  }
}

export { PromiseClass }
