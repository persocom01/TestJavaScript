// Demonstrates use of promises.
// Promises are objects that execute upon the completion or failure to
// complete of an operation.

// Gets url of image.
var url = document.querySelector('#img1').src

function getImage (url) {
  // The promise constructor takes in a single argument; a callback with
  // two function as arguments; resolve for if the operation worked, reject if
  // it did not.
  return new Promise(function (resolve, reject) {
    // It seems one of the most common use of promises is to download
    // stuff with XMLHttpRequest.
    // XMLHttpRequest's main advantage is the ability to update part of
    // a webpage without reloading it. It is critical in AJAX programming.
    var request = new XMLHttpRequest()
    request.open('GET', url)
    // In the case of an image, set responseType to blob for binary data.
    // Other types include document for html or xml and json for json.
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

function dlImageButton () {
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display:none'
  a.href = url
  a.download = 'image'
  a.click()
}
