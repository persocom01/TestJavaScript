#

## Installation

### face-api.js

1. Copy the face-api.js and face-api.js.map from the dist folder of https://github.com/justadudewhohacks/face-api.js into the same folder as the html page.

2. include the following code in the html page:

```
<script src="face-api.js"></script>
```

## Usage

face-api comes with a number of pre-trained models. To use them:

1. Copy the model shards and .json files from the weights folder at https://github.com/justadudewhohacks/face-api.js and paste them into a models folder in the same folder the html file is in.

2. Next, define a js async function as a script or separate js file somewhat as follows:

```
async function run () {
  const modelPath = './models'
  // Face detection.
  await faceapi.loadSsdMobilenetv1Model(modelPath)
  await faceapi.loadTinyFaceDetectorModel(modelPath)

  // ?
  await faceapi.loadMtcnnModel(modelPath)
  await faceapi.loadTinyYolov2Model(modelPath)

  // Face landmark model for face alignment.
  await faceapi.loadFaceLandmarkModel(modelPath)
  await faceapi.loadFaceLandmarkTinyModel(modelPath)

  // ?
  await faceapi.loadFaceRecognitionModel(modelPath)
  await faceapi.loadFaceExpressionModel(modelPath)

  // Age and gender recognition model.
  await faceapi.loadAgeGenderModel(modelPath)
}
```
