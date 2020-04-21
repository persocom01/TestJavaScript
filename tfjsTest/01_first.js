// Insert the following into the html doc before using this script:
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></script>

async function doTraining (model) {
  const history =
    await model.fit(xs, ys, {
      // Originally 500. For testing purposes a lower number is easier on the
      // cpu.
      epochs: 100,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log('Epoch:' + epoch + ' Loss:' + logs.loss)
        }
      }
    })
}
const model = tf.sequential()
model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
model.compile({
  loss: 'meanSquaredError',
  // sgd = stochastic gradient descent.
  optimizer: 'sgd'
})
model.summary()
// Training data. y = -1 + 2x
const xs = tf.tensor2d([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [6, 1])
const ys = tf.tensor2d([-3.0, -1.0, 1.0, 3.0, 5.0, 7.0], [6, 1])
doTraining(model).then(() => {
  // Expected result: 19
  alert(model.predict(tf.tensor2d([10], [1,1])))
})
