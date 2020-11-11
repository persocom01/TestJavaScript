// JS works on any web browser, as such, it is to be expected that one of the
// main uses of JS is to modify webpages. How this is done is through the HTML
// DOM, or Document Object Model, which allows JS access to all elements of a
// HTML page through objects.
// DOM is a subset of BOM, the Browser Object Model. DOM is standardized but
// other aspects of BOM may vary from browser to browser. For the purpose of
// this project, the differences between BOM and DOM are not important.
// A list of aspects of DOM that JS can use can be found here:
// https://www.w3schools.com/js/js_htmldom.asp

document.getElementById('demo').innerHTML = 'Hello World!'

class HtmlDomTest {
  constructor (params) {
    let p = params || {}
    if (typeof params === 'string') {
      p = { text: params }
    }

    this.logsEnabled = (typeof p.logsEnabled === 'undefined') ? true : p.logEnabled
  }

  log (msg) {
    if (this.logsEnabled) console.log(this.tag, msg)
  }

  documentObjectTest () {
    document.getElementById('demo').innerHTML = 'Hello World!'
  }

  init () {
    this.documentObjectTest()
  }
}
window.HtmlDomTest = HtmlDomTest
