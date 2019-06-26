// Demonstrates default exports.

// There can only be 1 default export per module, and one use is to export
// a single large object instead of multiple named exports.
var text1 = 'default import 1.'
var text2 = 'default import 2.'

export default {
  default1: text1,
  default2: text2
}
