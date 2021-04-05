// Demonstrates how to insert normal javascript into react components.

class Users {
  // The reason you use static is to avoid having to initialize a new instance
  // of the class when you wish to access its variables or methods. If you need
  // to pass arguments to the class, use a normal instance instead.
  static user = 'u'
  static password = 'pw'

  constructor (user, password) {
    this.user = user
    this.password = password
  }
}

export { Users }
