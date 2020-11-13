// Copyright 2019 The TensorFlow Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

/**
 * A class that wraps webcam video elements to capture Tensor4Ds.
 */


class Webcam {
  /**
   * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the
   *     webcam feed.
   */
  constructor (webcamElement = document.getElementById('webcam')) {
    let div
    const elements = {
      video: {
        attributes: ['autoplay', 'playsinline', 'muted'],
        id: 'webcam',
        width: 240,
        height: 240
      }
    }

    function createContainer () {
      return new Promise(function (resolve, reject) {
        div = document.createElement('div')
        div.setAttribute('id', 'webcam-container')
      })
    }

    function loadElement (type, properties) {
      if (type) {
        return new Promise(function (resolve, reject) {
          const element = document.createElement(type)

          Object.entries(properties).forEach((item) => {
            if (item[0] === 'attributes') {
              item[1].forEach((item) => {
                element.setAttribute(item, '')
              })
            } else {
              element.setAttribute(item[0], item[1])
            }
          })

          div.appendChild(element)
          document.body.appendChild(div)
        })
      }
    }

    // Create video element necessary for the webcam to function if one is not already present.
    if (webcamElement === null) {
      createContainer()
      Object.entries(elements).forEach((item) => {
        loadElement(item[0], item[1])
      })
      webcamElement = document.getElementById('webcam')
    }

    this.webcamElement = webcamElement
    this.tag = '[Webcam]'
  }

  /**
   * Captures a frame from the webcam and normalizes it between -1 and 1.
   * Returns a batched image (1-element batch) of shape [1, w, h, c].
   */

  capture () {
    return tf.tidy(() => {
      // Reads the image as a Tensor from the webcam <video> element.
      const webcamImage = tf.browser.fromPixels(this.webcamElement)

      const reversedImage = webcamImage.reverse(1)

      // Crop the image so we're using the center square of the rectangular
      // webcam.
      const croppedImage = this.cropImage(reversedImage)

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = croppedImage.expandDims(0)

      // Normalize the image between -1 and 1. The image comes in between 0-255,
      // so we divide by 127 and subtract 1.
      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1))
    })
  }

  /**
   * Crops an image tensor so we get a square image with no white space.
   * @param {Tensor4D} img An input image Tensor to crop.
   */

  cropImage (img) {
    const size = Math.min(img.shape[0], img.shape[1])
    const centerHeight = img.shape[0] / 2
    const beginHeight = centerHeight - (size / 2)
    const centerWidth = img.shape[1] / 2
    const beginWidth = centerWidth - (size / 2)
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3])
  }

  /**
   * Adjusts the video size so we can make a centered square crop without
   * including whitespace.
   * @param {number} width The real width of the video element.
   * @param {number} height The real height of the video element.
   */

  adjustVideoSize (width, height) {
    const aspectRatio = width / height
    if (width >= height) {
      this.webcamElement.width = aspectRatio * this.webcamElement.height
    } else if (width < height) {
      this.webcamElement.height = this.webcamElement.width / aspectRatio
    }
  }

  async setup () {
    let stream = null

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { width: this.webcamElement.width, height: this.webcamElement.height } })
      this.webcamElement.srcObject = stream
      this.webcamElement.addEventListener('loadeddata', async () => {
        this.adjustVideoSize(
          this.webcamElement.videoWidth,
          this.webcamElement.videoHeight)
      }, false)
    } catch (err) {
      console.log(this.tag, 'failure to load')
    }
  }
}
window.Webcam = Webcam
