import cv2
import socket
import threading
import struct

class MyCamera:
    stream_host=''
    stream_port=6000
    header_format = "L"

    vc = None
    is_streaming = False
    stream_thread = None
    image_shape = None

    def __init__(self):
        self.vc = cv2.VideoCapture(0)

    def startStream_task(self, returnAsJpeg = False):
        s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        print('Socket created')
        s.bind((self.stream_host,self.stream_port))
        print('Socket bind complete')
        s.listen(1)
        print('Socket now listening')

        conn,addr=s.accept()

        self.is_streaming=True
        while self.is_streaming:
            try:
                ret,frame=self.vc.read()
                if returnAsJpeg:
                    retval, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 100])
                    data = buffer.tobytes()
                    # conn.sendall(buffer)
                    conn.sendall(struct.pack("L", len(data))+data)
                else:
                    data = frame.tobytes()
                    # conn.sendall(data)
                    conn.sendall(struct.pack("L", len(data))+data)
            except:
                self.is_streaming=False


    """ ============================================================
        Exposed APIs
    ================================================================ """

    def status(self):
        if (self.vc.isOpened()):
            result = "on"
        else:
            result = "no camera detected"
        return result

    def getSnapshot(self):
        rval, frame = self.vc.read()
        
        retval, buffer = cv2.imencode('.jpg', frame)

        return [True, buffer]

    def start_stream(self, returnAsJpeg = False):
        if self.is_streaming:
            return [False, "Camera already streaming", -1]

        # TODO change stream length to header length. pass jpef directly to javascript

        ret,frame=self.vc.read()
        self.image_shape =  frame.shape

        self.stream_thread = threading.Thread(target=self.startStream_task, args=(returnAsJpeg,))
        self.stream_thread.start()

        return [True, "Started streaming", {
            "port": self.stream_port,
            "height": self.image_shape[0],
            "width": self.image_shape[1],
            "depth": self.image_shape[2]
        }]

    def stop_stream(self):
        if not self.is_streaming:
            return [False, "Recording was not started."]

        self.is_streaming = False
        self.stream_thread.join()
        self.stream_thread = None

        return [True, "Stopped streaming"]

