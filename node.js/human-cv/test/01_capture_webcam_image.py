import cv2

filename = './node.js/human-cv/test/test_img.jpg'

# Try either VideoCapture(0) or (1) based on camera availability.
# Using cv2.VideoCapture(0, cv2.CAP_DSHOW) may remove a warning for unknown
# reasons, but the captured image will also be different.
webcam = cv2.VideoCapture(0, cv2.CAP_DSHOW)

check, frame = webcam.read()
cv2.imwrite(filename=filename, img=frame)
webcam.release()
