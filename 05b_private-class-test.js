// Demonstrates private class fields and methods in js.

class Maid {
  constructor(obj) {
    this.name = obj.name
    this.#age = obj.age
  }
}

var maika = new Maid({name: 'Mafuyu', age: 16})

console.log(maika.name)
