# human-computer-vision-api-node.js

The human computer vision api implements AI-powered computer vision from the human javascript module as a stand alone service with the following features:
* 3D face detection & rotation tracking
* Face description
* Body pose tracking
* Iris analysis
* Age, gender and emotion prediction
* Gaze tracking
* Gesture recognition
* Body segmentation

## Pre-requisites

This api uses node.js and the latest node package manager (npm). It uses package-lock.json version 2, which can cause incompatibility issues with older versions of npm. Get both on windows here:

* [node 16.13.0](https://nodejs.org/en/)

## Installation

1. Clone the repository to your local computer

Using git bash, enter:

```
git clone git@github.dxc.com:Digital-Innovation-Lab-Asset/human-computer-vision-api.git
```

2. Install dependencies

As of the date this build was confirmed to be working (11 Nov 2021), the latest version of the human package is 2.5.1. To install all node packages, enter the following in command line while inside the app folder:

```
npm install
```

## Future improvements

These are list of improvements in no order of importance that were planned but not implemented for the api:
* Add html demo page
* Add minimum time between snapshots to active detection features
* Add option to customize front of detection drawn on jepg returned by the api.
* Fix the startup detection issue mentioned in `known issues`

## Tests

The functionality of the api was tested by running it with its integrated webcam functionality as well as with a separate webcam server, which can be found [here.](https://github.dxc.com/Digital-Innovation-Lab-Asset/webcam-server) The following endpoints were tested:

| No. | Endpoint | Results |
| ------ | ------ | ------ |
| 1 | /detect | <ul><li>if active detection is on, returns a json of the last detection results</li><li>if active detection is off, a snapshot detection is performed</li></ul> |
| 2 | /detect?as=img | <ul><li>if active detection is on, returns a binary jepg image file of the last detection</li><li>if active detection is off, a snapshot detection is performed</li></ul> |
| 3 | /detect?as=both | <ul><li>if active detection is on, returns a json with two keys, `result` and `image`, containing the last detection result and a base64 encoded string of the last image with detections drawn on it</li><li>if active detection is off, a snapshot detection is performed</li></ul> |
| 4 | / | returns a json of all available endpoints |
| 5 | /snapshot | <ul><li>takes a snapshot using the camera and returns a json of detection results</li><li>Time taken: ~1.4s</li></ul> |
| 6 | /snapshot?as=raw | <ul><li>takes a snapshot using the camera and returns the raw image as a binary jepg file without performing any detections</li><li>Time taken: ~0.9s</li></ul> |
| 7 | /snapshot?as=img | <ul><li>takes a snapshot using the camera and returns it as a binary jepg file with detections drawn on it</li><li>Time taken: ~1.5s</li></ul> |
| 8 | /snapshot?as=both | <ul><li>takes a snapshot using the camera and returns the result as a json with two keys, `result` and `image`, containing the detection result and a base64 encoded string of the image with detections drawn on it</li><li>Time taken: ~1.7s</li></ul> |
| 9 | /start_detect | starts active detection |
| 10 | /start_detect?interval=2 | <ul><li>starts active detection with detection interval of 2s if not already active</li><li>changes active detection interval to 2s if already active</li></ul> |
| 11 | /stop_detect | stops active detection |
| 12 | /file | <ul><li>a json of detection results was returned after a binary image file was uploaded</li><li>Time taken: ~1.6s</li></ul> |
| 13 | /file?as | <ul><li>a json of detection results was returned after a binary image file was uploaded</li><li>Time taken: ~1.7s</li></ul> |

In addition, limited testing was performed on the performance of the model to detect age, gender, 6 emotions, as well as track body parts. The images used in emotion testing are located in the `test` folder. The results of the tests are as follows:

| No. | Test | Results |
| ------ | ------ | ------ |
| 1 | age | the model returns the user's age within an around + or - 5 year range. Lighting, shadow, and the presence or lack of facial hair may cause the detection to be more inaccurate than that |
| 2 | gender | the model detects traditional genders accurately |
| 3 | anger | the model got only 1/4 predictions correct |
| 4 | disgust |  <ul><li>the model got no predictions correct</li><li>3/4 disgusted images were classified as sad instead</li></ul> |
| 5 | fear | the model got 2/4 predictions correct |
| 6 | happy | <ul><li>the model got only 1/4 predictions correct</li><li>3/4 happy images were classified as sad instead</li></ul> |
| 7 | sad | the model got 4/4 predictions correct |
| 8 | surprise | <ul><li>the model got no predictions correct</li><li>3/4 happy images were classified as sad instead</li></ul> |
| 9 | body tracking | <ul><li>the model tracks the body fairly well, but lighting will affect the detected position of extremities</li><li>Since body tracking is used for gesture detection, for more reliable gesture detection, not using the position of extremities like the hands or feet is suggested</li></ul> |

## Usage

### Configuration

The configuration files are located in `config.json` inside the `config` folder. The configuration file contains 5 keys:

1. `active_detection` - contains subkeys that give the user control over the api's active detection feature. Active detection causes the api to actively perform detections on webcam images without user input. The detections can be retrieved from the api later.
  - `enabled` - set to `true` to cause the api to repeatedly perform detections on camera snapshots.
  - `interval` - this is the interval in seconds, between active detections. It does not include the detection time itself. So 1 seconds interval + 1 second detection will make the time between detections 2 seconds.
  - `snapshot_url` - this is the url from which the api retrieves binary camera snapshot data. `use_local_camera` must be set to `false` for this to work.
  - `use_local_camera` - causes the api to use its integrated camera module for active detections.
2. `camera` - contains subkeys that configure the api's integrated camera module. Irrelevant if `use_local_camera` is set to `false`.
  - `initialize` - if set to `true`, the camera will be turned on and be ready for use when the api is started. Even if set to `false`, the camera will be turned on if any endpoint uses the local camera.
  - `options` - Contains the main configuration options for the camera, mainly the format of image returned, as well as the height and width of the image. The port here defines the port of the headless browser that this api uses to activate the camera. The full list of options can be found here: https://github.com/cancerberoSgx/camera-capture/blob/master/docs/interfaces/_types_.captureoptions.md
2. `commands` - contains subkeys that determine the path parts of the urls needed to use api. For example: `http://example-domain.com<path>`.
  - `get_current_detection` - `GET` the last detection results if `active_detection` is set to `true`. Otherwise it will activate the `get_snapshot`.
  - `get_help` - `GET` the list of api commands.
  - `get_snapshot` - `GET` a snapshot using the camera and returns the detection results.
  - `get_start_active_detection` - `GET` the api to start using the camera to perform detections in a loop.
  - `get_stop_active_detection` - `GET` the api to start using the camera to perform detections in a loop.
  - `post_detect_from_image_file` - `POST` a binary jepg image to this endpoint to get its detection results as a json response. Works without the camera.
  - `post_image_with_detection_from_image_file` - `POST` a binary jepg image to this endpoint to get its detection results drawn on the image and returned as the response. Works without the camera.
3. `human_params` - These are the parameters of the main module used in this api, human. The configurations are too many to list, and can be read from official documentation here: https://vladmandic.github.io/human/typedoc/interfaces/Config.html
4. `log_prefix` - the prefix when this api prints to the console log.
5. `port` - the port the api runs on.

### Deployment

To start the api, in the command line enter:

```
npm start
```

A sample windows `.bat` file has also been provided if it is preferred.

Many features also require the camera service to be running. The camera app is located under `test/camera` for convenience, and can be run by entering:

```
python app.py
```

To start active detection on startup, set `active_detection` to `true` under the `camera` key inside the config file located at `config/config.json`. Otherwise, active detection can also be activated by hitting the start detection api endpoint.

### Inputs and Outputs

### Inputs

This api requires an image source in order to run computer vision detections on. This cam come from 3 possible sources:
1. Local computer webcam - for convenience, a [node.js webcam](https://github.dxc.com/Digital-Innovation-Lab-Asset/webcam-server) was integrated into this api to make it capable of accessing a webcam on the local computer. To use it, ensure that inside the config file, `use_local_camera` is set to `true`.
2. A url endpoint - the webcam service can be run and separately and a url endpoint for binary jepg snapshots can be given to the api instead. To use this option, ensure that inside the config file, `use_local_camera` is set to `false` and `snapshot_url` is set to the correct address.
3. File uploads - as a last resort, this api is capable of running without a camera, but images will have to be uploaded to it from an external source. While there is no requirement to use this option, if this is the primary way this api is used, ensure that inside the config file, `use_local_camera` is set to `false`.

If the api is configured to use the local camera or url endpoint, it requires no inputs to perform detections on images from those sources.

### Outputs

This api is made to be able to provide detection results in the following 3 formats:
1. Json (default)
2. A binary jepg file of the original image with detections drawn on it. To get the result in this format, append `?as=img` when retrieving results from this api's url endpoints
3. Json containing both the detection results under the `result` key, as well as a binary jepg file of the original image with detections drawn on it encoded as a base64 string under the `image` key.

The definitions of detection results can be found here: https://vladmandic.github.io/human/typedoc/interfaces/Result.html

### Custom gestures

This implementation of human-cv has additional gestures implemented under `modules/human/additional-gestures.js`. The module was structured that way as to make it easy to add more custom gestures to the detection results.

## Known issues

### 'ERR_DLOPEN_FAILED' for canvas module

This occurs when the node version is changed without reinstalling canvas. In command line, enter:

```
npm uninstall canvas
npm install canvas
```

To reinstall the package.

### Error: The Node.js native addon module (tfjs_binding.node) can not be found

Turn zscaler off and run the following command:

```
npm rebuild @tensorflow/tfjs-node build-addon-from-source
```

### Incomplete results

The human module is designed not to re-run every detection model every time it is called, and instead use a cache of prior results. This is reflected the `skipFrames` configuration options. This accelerates the module's response time, as well saving processing power.

However, this also causes an incomplete startup problem, where the results for the first detection may be incomplete, likely as the models running in the background have not yet completed saving their results to cache.

When using the api to run detection over multiple snapshots this is not an issue, but is an issue when the user expects a complete detection from the first snapshot.
