const canvas = require('canvas')

async function processImage (input) {
  globalThis.Canvas = canvas.Canvas // patch global namespace with canvas library
  globalThis.ImageData = canvas.ImageData

  const inputImage = await canvas.loadImage(input) // load image using canvas library
  console.log('Loaded image', input, inputImage.width, inputImage.height)
  const inputCanvas = new canvas.Canvas(inputImage.width, inputImage.height) // create canvas
  const ctx = inputCanvas.getContext('2d')
  ctx.drawImage(inputImage, 0, 0)
  return [inputImage.width, inputImage.height]
}

module.exports = { processImage }
