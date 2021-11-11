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

This app uses node.js and the latest node package manager (npm). It uses package-lock.json version 2, which can cause incompatibility issues with older versions of npm. Get both on windows here:

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

These are list of improvements that were planned but not implemented for the api:
* Add inbuilt camera functionality to the api
* Add html demo page
* Add ability to get detection results along with the image in a single json to the api's `POST` endpoints
* Add minimum time between snapshots to active detection features

## Tests

The functionality of the api was tested by running it alongside the camera app service provided inside the `test` folder. The api has endpoints that will still function without the camera app, but a jepg image needs to be sent to those endpoints to return a detection. The following endpoints were tested:

| No. | Endpoint | Results |
| ------ | ------ | ------ |
| 1 | /detect | <ul><li>returns a json of detection results if active detection is on</li><li>performs a snapshot detection if active detection is off</li></ul> |
| 2 | / | returns a json of all available endpoints |
| 3 | /snapshot | takes a snapshot using the camera and returns a json of detection results |
| 4 | /start_detect | starts active detection |
| 5 | /stop_detect | stops active detection |
| 6 | /file | <ul><li>a json of detection results was returned after a binary image file was uploaded</li><li>Time taken: ~1.6s</li></ul> |
| 7 | /image | <ul><li>a binary image file was received with the detections drawn on it.</li><li>Time taken: ~1.6s</li></ul> |

In addition limited testing was performed on the performance of the model to detect age, gender, 6 emotions, as well as track body parts. The images used in emotion testing are located in the `test` folder. The results of the tests are as follows:

| No. | Test | Results |
| ------ | ------ | ------ |
| 1 | age | the model returns the user's age within an around + or - 5 year range. Lighting, shadow, and the presence or lack of facial hair may cause the detection to be more inaccurate than that |
| 2 | gender | the model detects traditional genders accurately |
| 3 | anger | the model got only 1/4 predictions correct |
| 4 | disgust |  <ul><li>the model no predictions correct</li><li>3/4 disgusted images were classified as sad instead</li></ul> |
| 5 | fear | the model got only 2/4 predictions correct |
| 6 | happy | <ul><li>the model got only 1/4 predictions correct</li><li>3/4 happy images were classified as sad instead</li></ul> |
| 7 | sad | the model got only 4/4 predictions correct |
| 8 | surprise | <ul><li>the model got no predictions correct</li><li>3/4 happy images were classified as sad instead</li></ul> |
| 9 | body tracking | <ul><li>the model tracks the body fairly well, but lighting will affect the detected position of extremities</li><li>Since body tracking is used for gesture detection, for more reliable gesture detection, not using the position of extremities like the hands or feet is suggested</li></ul> |

It should be noted that although the human module boasts many capabilities, one should not be expect all of them to run well concurrently. For instance, while the module is capable of counting the number of persons in an image, the resolution of the image would make any attempt to track the fingers of each person's hands close to impossible. Thus one should keep in mind the use case for this api and configure it accordingly.

## Usage

### Configuration

The configuration files are located in `config.json` inside the `config` folder. The configuration file contains 6 keys:

1. `camera` - contains subkeys that relate to how the api interacts with the camera service.
  - `active_detection` - set to `true` to cause the api to use the camera to perform detection repeatedly.
  - `enabled` - currently serves no purpose as this is reserved for future local camera functionality.
  - `interval` - this is the interval in seconds, between active detections. It does not include the detection time itself. So 1 seconds interval + 1 second detection will make the time between detections 2 seconds.
  - `url` - this is the url target that the api sends snapshot requests to.
2. `commands` - contains subkeys that determine the path parts of the urls needed to use api. For example: `http://example-domain.com<path>`.
  - `get_current_detection` - `GET` the last detection results if `active_detection` is set to `true`. Otherwise it will activate the `get_snapshot`.
  - `get_help` - `GET` the list of api commands.
  - `get_snapshot` - `GET` a snapshot using the camera and returns the detection results.
  - `get_start_active_detection` - `GET` the api to start using the camera to perform detections in a loop.
  - `get_stop_active_detection` - `GET` the api to start using the camera to perform detections in a loop.
  - `post_detect_from_image_file` - `POST` a binary jepg image to this endpoint to get its detection results as a json response. Works without the camera.
  - `post_image_with_detection_from_image_file` - `POST` a binary jepg image to this endpoint to get its detection results drawn on the image and returned as the response. Works without the camera.
3. `human_params` - These are the parameters of the main module used in this api, human. The configurations are too many to list, and can be read from official documentation here: https://vladmandic.github.io/human/typedoc/interfaces/Config.html
4. `log_prefix` - the prefix when this app prints to the console log.
5. `port` - the port the app runs on.

### Deployment

Yo start the app, in the command line enter:

```
npm start
```

A sample windows `.bat` file has also been provided if it is preferred.

### Inputs and Outputs

The api's `GET` endpoints require no input, except that the camera service be running. They return their responses as json files. The definitions of detection results can be found here: https://vladmandic.github.io/human/typedoc/interfaces/Result.html

The input from the camera was made specific to the camera app and hardcoded into this api. This api expects from the camera snapshot api a json response with the image encoded as a base64 string value under the `snapshot` key.

The inputs of the `POST` endpoints are binary jepg images. The results are returned as json or as binary jepg images with the results drawn on them.

## Known issues

The api does not seem to detect bodies well on startup. The reason for this is unknown, save that this issue occurs the first time a detection is attempted on an image, and affects the detection results, which will register body has being not detected. Many hours were spent trying to rectify this issue, but to no avail. As the human module itself is very new, with updates being made almost every week at the time of this implementation (11 Nov 2021), this very well could be a bug.

## Contributing

Please reach out to Digital Innovation Lab (SG).

## Authors

Clarence Toh - *baseline*

## License

The copyright of this project belongs to DXC and Digital Innovation Lab (SG). All rights reserved.
