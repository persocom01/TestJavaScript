console.log(faceapi.nets)

async function loadModel () {
  await faceapi.loadSsdMobilenetv1Model('tfjs_use_case\\ssd_mobilenetv1_model-weights_manifest.json')
}

// await faceapi.loadAgeGenderModel(MODEL_URL)
