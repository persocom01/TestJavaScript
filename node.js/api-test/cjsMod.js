class Mod1Class {
  constructor () {
    this.name = 'Mod1Class'
  }

  divideQueryByTwo (query) {
    var output = query / 2
    return output
  }
}

// You can export functions in the same way, and multiple functions can be
// exported at the same time.
module.exports = { Mod1Class }
