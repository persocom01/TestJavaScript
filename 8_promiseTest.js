// Demonstrates use of promises.
// Promises are objects that execute upon the completion or failure to
// complete of an operation.

// Doesn't work atm, will return to this in future.
import XMLHttpRequest;

function imgLoad (url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.responseType = 'blob'
    request.onload = function () {
      if (request.status === 200) {
        resolve(request.response)
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText))
      }
    }
    request.onerror = function () {
      reject(Error('There was a network error.'))
    }
    request.send()
  })
}

imgLoad('https://raw.githubusercontent.com/persocom01/TestJavaScript/master/images/Mika%20sit.png')
