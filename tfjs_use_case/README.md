#

## Installation

### face-api.js

1. Copy the face-api.js and face-api.js.map from the dist folder of https://github.com/justadudewhohacks/face-api.js into the same folder as the html page.

2. include the following code in the html page:

```
<script src="face-api.js"></script>
```

## Usage

var loadSsdMobilenetv1Model = function (url) { return nets.ssdMobilenetv1.load(url); };
var loadTinyFaceDetectorModel = function (url) { return nets.tinyFaceDetector.load(url); };
var loadMtcnnModel = function (url) { return nets.mtcnn.load(url); };
var loadTinyYolov2Model = function (url) { return nets.tinyYolov2.load(url); };
var loadFaceLandmarkModel = function (url) { return nets.faceLandmark68Net.load(url); };
var loadFaceLandmarkTinyModel = function (url) { return nets.faceLandmark68TinyNet.load(url); };
var loadFaceRecognitionModel = function (url) { return nets.faceRecognitionNet.load(url); };
var loadFaceExpressionModel = function (url) { return nets.faceExpressionNet.load(url); };
var loadAgeGenderModel = function (url) { return nets.ageGenderNet.load(url); };
