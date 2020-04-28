// Pre-trained models found at: https://github.com/tensorflow/tfjs-models

async function run () {
  const port = 90
  const MODEL_URL = `http://127.0.0.1:${port}/model.json`
  const model = await tf.loadLayersModel(MODEL_URL)
  console.log(model.summary())
  const input = tf.tensor2d([10.0], [1, 1])
  const result = model.predict(input)
  alert(result)
}
run()
