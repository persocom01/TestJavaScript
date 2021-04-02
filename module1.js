// Demonstrates default exports.

// There can only be 1 default export per module. One way to get around this is
// is to export a module object.
var text1 = 'default import 1.'
var text2 = 'default import 2.'

export default {
  default1: text1,
  default2: text2
}
