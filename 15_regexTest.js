// Demonstrates use of regex in js.

var text = 'I at ice-cream at the ice ring.'
// As written elsewhere, regex is indicated by the brackets /regex/.
var re = /ice[- ]cream/gmi
var reObj = new RegExp('ice[- ]/w+')
