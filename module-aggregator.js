// An export aggregator collects all the exported modules in a single file.
// One reason to aggregate exports is to reduce the number of http requests
// needed to load a page. This generally improves front-end performance.
// However, aggregates should not be applied to conditional imports as the
// browser would download multiple aggregates if they are slightly different
// due to the conditional nature of the code.

// Demonstrated here with a class export, as putting all exports in a file into
// a single object makes the syntax when exporting and importing easier. You
// may also rename the exports using as, for instance:
// export { default as Mod1 } from './module1.js'
export { Mod2Class } from './module2.js'
export { Mod3Class } from './module3.js'
