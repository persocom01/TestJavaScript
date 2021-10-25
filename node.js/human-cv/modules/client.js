// this is sample code on how to receive data from sockets

import net from "net";
import struct from "python-struct";

var host = 'localhost';
var port = 6000;

var socket = new net.Socket();
socket.connect(port, host, () => {
    socket.write('GET / HTTP/1.0\r\n\r\n');
});


let header_found = false;
let header_length = struct.sizeOf('L'); 
let header_buffer = Buffer.alloc(header_length);

let msg_size = 0;
let buffer = Buffer.alloc(0);
let frame = Buffer.alloc(0);

socket.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);
    if (!header_found) {
        buffer.copy(header_buffer, 0, 0, header_length);
        msg_size = struct.unpack('L', Buffer.from(header_buffer, 'hex'))[0];
        frame = Buffer.alloc(msg_size);
        
        const newBuffer = Buffer.alloc(buffer.length-header_length);
        buffer.copy(newBuffer, 0, header_length, buffer.length);
        buffer = newBuffer;
        
        header_found = true;
    }
    else if (buffer.length<msg_size) {
        return
    }
    else {
        buffer.copy(frame, 0, 0, msg_size);
        const newBuffer = Buffer.alloc(buffer.length-msg_size);
        buffer.copy(newBuffer, 0, msg_size, buffer.length);
        buffer = newBuffer;

        console.log(frame.length)
        console.log(buffer.length)
        // console.log(frame.toString());

        header_found = false;
        // socket.destroy();
    }
});
