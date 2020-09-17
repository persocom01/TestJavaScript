// Demonstrates read and writing images using opencv.js

// This function is used so that opencv.js will be loaded before the code here
// is run.
async function readWriteImg () {
  // Read image from image element.
  // When reading from an img element, the resized image is read, not the
  // original.
  const src = cv.imread('img1')

  // Process image.
  const dst = new cv.Mat()
  // Color conversion codes:
  // https://docs.opencv.org/4.2.0/d8/d01/group__imgproc__color__conversions.html#ga4e0972be5de079fed4e3a10e24ef5ef0
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)

  // Display image.
  await cv.imshow('cOut1', dst)

  // Cleanup.
  src.delete()
  dst.delete()
}

async function readWriteCanvas () {
  let img = document.getElementById('img1')
  // Resize new canvas to input image dimensions.
  let canvas = document.getElementById('cIn1')
  canvas.height = img.height
  canvas.width = img.width
  let ctx = canvas.getContext('2d')
  // ctx.drawImage(image, dx, dy)
  // ctx.drawImage(image, dx, dy, dWidth, dHeight)
  // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // x, y are coordinates from the top left of the image to begin drawing.
  // d = destination s = source.
  // Width and Height are the dimensions of the image. The image is cropped
  // from the source and resized to the destination according to these
  // dimensions.
  await ctx.drawImage(img, 0, 0, 283, 397)

  // Draw processed image onto new canvas.
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const src = cv.matFromImageData(imgData)
  const dst = new cv.Mat()

  // Process image.
  // Mat::convertTo(OutputArray m, int_rtype, double_scale=1, double_shift=0 )
  // input*scale = output. Can be used to scale images from 0-255 to 0-1.
  // input+shift = output.
  // This line is necessary to convert imgData from BGR order to RGB that
  // the canvas elements accepts.
  src.convertTo(dst, cv.CV_8U, 1, 0)
  cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY)
  cv.equalizeHist(dst, dst)
  // Color must be converted back to RGBA to be displayed on canvas.
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA)

  // Display image.
  // cv.imshow('cOut2', dst)

  canvas = document.getElementById('cOut2')
  ctx = canvas.getContext('2d')
  // new ImageData(array, width). Alternatively:
  // imgData = ctx.createImageData(dst.cols, dst.rows)
  // imgData.data.set(new Uint8ClampedArray(dst.data, dst.cols, dst.rows))
  imgData = new ImageData(new Uint8ClampedArray(dst.data, dst.cols, dst.rows), dst.cols)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = imgData.width
  canvas.height = imgData.height
  await ctx.putImageData(imgData, 0, 0)

  // Cleanup.
  src.delete()
  dst.delete()
}

function openCvReady () {
  cv.onRuntimeInitialized = async () => {
    await readWriteImg()
    await readWriteCanvas()
  }
}

openCvReady()
