// this is sample code on how to receive data from sockets
const net = require('net')
const struct = require('python-struct')

class Stream {
  constructor (host, port) {
    this.host = host
    this.port = port
    this.isStreaming = false
    this.socket = null

    this.header_found = false;
    this.header_length = struct.sizeOf('L');
    this.header_buffer = Buffer.alloc(this.header_length);

    this.msg_size = 0;
    this.buffer = Buffer.alloc(0);
    this.frame = Buffer.alloc(0);
  }

  get isStreaming () {
    return this._isStreaming
  }

  set isStreaming (bool) {
    if (typeof bool !== 'boolean') {
      console.error('isStreaming must be a boolean')
    } else {
      this._isStreaming = bool
    }
  }

  getFrame () {
    return this.frame
  }

  startStream () {
    this.socket = new net.Socket()
    this.socket.connect(this.port, this.host, () => {
      this.socket.write('GET / HTTP/1.0\r\n\r\n')
    })
    const myObj = this
    this.socket.on('data', (data) => {
      myObj.parseData(data)
    })

    console.log('[streaming]starting stream...')
    this._isStreaming = true
  }

  parseData (data) {
    this.buffer = Buffer.concat([this.buffer, data]);
    if (!this.header_found) {
      this.buffer.copy(this.header_buffer, 0, 0, this.header_length);
      this.msg_size = struct.unpack('L', Buffer.from(this.header_buffer, 'hex'))[0];
      this.frame = Buffer.alloc(this.msg_size);

      const newBuffer = Buffer.alloc(this.buffer.length-this.header_length);
      this.buffer.copy(newBuffer, 0, this.header_length, this.buffer.length);
      this.buffer = newBuffer;

      this.header_found = true;
    }
    else if (this.buffer.length<this.msg_size) {
        return
    }
    else {
        this.buffer.copy(this.frame, 0, 0, this.msg_size);
        const newBuffer = Buffer.alloc(this.buffer.length-msg_size);
        this.buffer.copy(newBuffer, 0, this.msg_size, this.buffer.length);
        this.buffer = newBuffer;

        console.log(this.frame.length)
        console.log(this.buffer.length)
        // console.log(frame.toString());

        this.header_found = false;
        // socket.destroy();
    }
  }
}

module.exports = { Stream }
