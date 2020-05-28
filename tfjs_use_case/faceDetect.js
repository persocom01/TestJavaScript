const webcam = new Webcam(document.getElementById('wc'))

// function handleButton (elem) {
//   switch (elem.id) {
//     case '0':
//       rockSamples++
//       document.getElementById('rocksamples').innerText = 'Rock samples:' + rockSamples
//       break
//     case '1':
//       paperSamples++
//       document.getElementById('papersamples').innerText = 'Paper samples:' + paperSamples
//       break
//     case '2':
//       scissorsSamples++
//       document.getElementById('scissorssamples').innerText = 'Scissors samples:' + scissorsSamples
//       break
//   }
//   label = parseInt(elem.id)
//   const img = webcam.capture()
//   dataset.addExample(mobilenet.predict(img), label)
// }

async function run () {
  const modelPath = './models'
  // Face detection.
  await faceapi.loadTinyFaceDetectorModel(modelPath)
  // Age and gender recognition model.
  await faceapi.loadAgeGenderModel(modelPath)

  await webcam.setup()
  const img = webcam.capture()
}

  // start processing image
  // updateResults()

run()
