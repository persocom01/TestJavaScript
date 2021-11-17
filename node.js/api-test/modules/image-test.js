// This file ensures that the image file received can be read as one by loading
// it with canvas. For testing purposes, the image is subsequently written to
// buffer to be sent back to see it it returns in one piece.
const canvas = require('canvas')

globalThis.Canvas = canvas.Canvas // patch global namespace with canvas library
globalThis.ImageData = canvas.ImageData

async function loadImage (input) {
  const inputImage = await canvas.loadImage(input) // load image using canvas library
  console.log('Loaded image', input, inputImage.width, inputImage.height)
  const inputCanvas = new canvas.Canvas(inputImage.width, inputImage.height) // create canvas
  const ctx = inputCanvas.getContext('2d')
  ctx.drawImage(inputImage, 0, 0)
  return inputCanvas
}

async function image2buffer (input) {
  const imageCanvas = await loadImage(input)
  const buffer = imageCanvas.toBuffer('image/jpeg')
  return buffer
}

async function image2stream (input, callback) {
  const imageCanvas = await loadImage(input)
  const stream = imageCanvas.createJPEGStream({ quality: 0.75, progressive: true, chromaSubsampling: true })
  callback(stream)
}

module.exports = { image2buffer, image2stream }
