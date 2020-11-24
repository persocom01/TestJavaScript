// Demonstrates use of promises.
// Promises are objects that execute upon the completion or failure to
// complete of an operation.
// This code is meant to be loaded into a html page and opened in a browser to
// work.

// Gets url of image.
var url = document.querySelector('#img1').src
// Extracts filename from url.
var fileName
fileName = url.replace(/%20/, ' ')
fileName = fileName.match(/\/([\w ]+)\.?\w*$/)[1]

function get (url, response = 'blob') {
  // It seems one of the most common use of promises is to download
  // stuff with XMLHttpRequest.
  // XMLHttpRequest's main advantage is the ability to update part of
  // a webpage without reloading it. It is critical in AJAX programming.
  var request = new XMLHttpRequest()
  // The promise constructor takes in a single argument; a callback function
  // with up to two function as arguments; resolve for if the operation worked,
  // or reject if it did not. Reject is optional.
  return new Promise(function (resolve, reject) {
    request.open('GET', url)
    // In the case of an image, set responseType to blob for binary data.
    // Other types include document for html or xml and json for json.
    request.responseType = response
    request.onload = function () {
      if (request.status === 200) {
        // A promise returns anything inside the resolve function.
        // It may only return a single value or object.
        resolve(request.response)
      } else {
        // Linter rules state that reject must always be followed by an error
        // object.
        reject(new Error('Load unsuccessful, error code:' + request.statusText))
      }
    }
    request.onerror = function () {
      reject(new Error('There was a network error.'))
    }
    request.send()
  })
}

function saveBlob (blob, fileName) {
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = fileName
  a.click()
}

// Makes a button download a file on click.
// Typically, it is better to make a link look like button rather than a button
// work like a link, as JS can be disabled.
function dlImageButton () {
  // To use a promise object, one must attach .then(value => doSomething(value))
  // to it. You may choose not to use an arrow function, but you'll still have
  // to define a new function and not immediately call an existing one.
  // It is possible to string promises using a .then chain.
  // To perform an action if the promise is not resolved, use .catch instead.
  // In a promise chain, a single .catch at the end will execute no matter
  // where in the chain the promise failed.
  get(url).then(blob => saveBlob(blob, fileName)).catch(err => console.error(err))
}

window.PromiseTest = 1
