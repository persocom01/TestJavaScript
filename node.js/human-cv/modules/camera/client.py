import socket
import sys
import cv2
import struct
import numpy as np


clientsocket=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
clientsocket.connect(('localhost', 6000))  #get port from REST api


### new
data = b''
payload_size = struct.calcsize("L") 

while True:
    while len(data) < payload_size:
        data += clientsocket.recv(65536)
    packed_msg_size = data[:payload_size]
    data = data[payload_size:]
    msg_size = struct.unpack("L", packed_msg_size)[0]
    while len(data) < msg_size:
        data += clientsocket.recv(65536)
    frame_data = data[:msg_size]
    data = data[msg_size:]
    ###

    frame = np.frombuffer(frame_data, np.uint8)
    frame = frame.reshape(480, 640, 3)

    cv2.imshow('frame',frame)
    cv2.waitKey(1)