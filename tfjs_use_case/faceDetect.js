console.log(faceapi.nets)

async function run () {
  const modelPath = './models'
  // Face detection.
  await faceapi.loadSsdMobilenetv1Model(modelPath)
  // Age and gender recognition model.
  await faceapi.loadAgeGenderModel(modelPath)
}


  // start processing image
  // updateResults()

run()

var loadSsdMobilenetv1Model = function (url) { return nets.ssdMobilenetv1.load(url); };
var loadTinyFaceDetectorModel = function (url) { return nets.tinyFaceDetector.load(url); };
var loadMtcnnModel = function (url) { return nets.mtcnn.load(url); };
var loadTinyYolov2Model = function (url) { return nets.tinyYolov2.load(url); };
var loadFaceLandmarkModel = function (url) { return nets.faceLandmark68Net.load(url); };
var loadFaceLandmarkTinyModel = function (url) { return nets.faceLandmark68TinyNet.load(url); };
var loadFaceRecognitionModel = function (url) { return nets.faceRecognitionNet.load(url); };
var loadFaceExpressionModel = function (url) { return nets.faceExpressionNet.load(url); };
var loadAgeGenderModel = function (url) { return nets.ageGenderNet.load(url); };
