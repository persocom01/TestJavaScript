// this is sample code on how to receive data from sockets
const net = require('net')
const struct = require('python-struct')

class Stream {
  constructor (host, port) {
    this.host = host
    this.port = port
    this.isConnected = false
    this.socket = null
    this.frame = null
  }

  get isConnected () {
    return this._isConnected
  }

  set isConnected (bool) {
    if (typeof bool !== 'boolean') {
      console.error('isConnected must be a boolean')
    } else {
      this._isConnected = bool
    }
  }

  connect () {
    this.socket = new net.Socket()
    this.socket.connect(this.port, this.host, () => {
      this.socket.write('GET / HTTP/1.0\r\n\r\n')
    })
    this._isConnected = true
    console.log('[streaming]connection success')
  }

  getStreamData () {
    if (!this._isConnected) {
      this.connect()
    }
    let headerFound = false
    let headerLength = struct.sizeOf('L')
    let headerBuffer = Buffer.alloc(headerLength)

    let msgSize = 0
    let buffer = Buffer.alloc(0)
    let frame = Buffer.alloc(0)

    this.socket.on('data', (data) => {
      buffer = Buffer.concat([buffer, data])
      if (!headerFound) {
        buffer.copy(headerBuffer, 0, 0, headerLength)
        msgSize = struct.unpack('L', Buffer.from(headerBuffer, 'hex'))[0]
        frame = Buffer.alloc(msgSize)
        return frame
      } else if (buffer.length < msgSize) {
        return 'error?'
      } else {
        buffer.copy(frame, 0, 0, msgSize)
        const newBuffer = Buffer.alloc(buffer.length - msgSize)
        buffer.copy(newBuffer, 0, msgSize, buffer.length)
        buffer = newBuffer

        console.log(frame.length)
        console.log(buffer.length)
        // console.log(frame.toString())

        headerFound = false
        // socket.destroy()
      }
    })
  }
}

module.exports = { Stream }
