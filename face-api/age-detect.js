const webcam = new Webcam()
const modelPath = './models'
const ageRange = [0, 19, 29, 39, 49, 59, 69, 79, 999]
const mortalityRate = [0.00, 0.05, 0.11, 0.19, 0.30, 0.80, 2.70, 7.98, 15.90]
const interval = 3000

async function loadModels () {
  await faceapi.loadTinyFaceDetectorModel(modelPath)
  await faceapi.loadAgeGenderModel(modelPath)
}

// Returns the mortality rate for the age.
function getMortality (age) {
  if (age > 999) {
    return 'invalid age'
  }
  let ageIndex = 0
  for (var i in ageRange) {
    if (age < ageRange[i]) {
      ageIndex = i
      break
    }
  }
  return mortalityRate[ageIndex]
}

// Creates the canvas and appends it to the webcam div.
async function createCanvas (video) {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.getElementById('webcam-container').appendChild(canvas)
  return canvas
}

// Detects the face and outputs the results on the canvas.
async function updateResults (video, canvas) {
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender()
  const resizedDetections = faceapi.resizeResults(detections, displaySize)
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  faceapi.draw.drawDetections(canvas, detections)
  detections.forEach(result => {
    const { age, gender, genderProbability } = result
    const mortality = getMortality(age)
    new faceapi.draw.DrawTextField(
      [
        `${faceapi.utils.round(age, 0)} years`,
        `${gender} (${faceapi.utils.round(genderProbability)})`,
        `covid mortality rate ${mortality}%`
      ],
      result.detection.box.bottomLeft
    ).draw(canvas)
  })
}

// Redraws the canvas at regular intervals.
async function onPlay (video, period) {
  const canvas = await createCanvas(video)
  setInterval(async () => updateResults(webcam.webcamElement, canvas), period)
}

async function run () {
  await webcam.setup()
  await loadModels()
  await onPlay(webcam.webcamElement, interval)
}

run()
