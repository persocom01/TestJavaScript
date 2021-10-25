import cv2

# Try either VideoCapture(0) or (1) based on camera availability.
# Using cv2.VideoCapture(0, cv2.CAP_DSHOW) may remove a warning for unknown
# reasons, but the captured image will also be different.
webcam = cv2.VideoCapture(0)

check, frame = webcam.read()
cv2.imwrite(filename=r'./human_cv/test/test.jpg', img=frame)
webcam.release()
