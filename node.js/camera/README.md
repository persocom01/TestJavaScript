# webcam-server-node.js

Server based access to a webcam. This implementation was chosen as it is cross platform compatible, is reasonably functional, and compatible with the latest LTS version of node.js. This is done using Puppeteer, a Node library for controlling a headless Chrome or Chromium browser to access the webcam.

This is the stand alone version of a node.js webcam. The main module `/modules/camera.js` can be integrated into other node.js projects that need camera access.

This app is capable of returning the following types of information:
* a jepg snapshot image (configurable)
* a webm recorded video

## Pre-requisites

This app uses node.js and the latest node package manager (npm). It uses package-lock.json version 2, which can cause incompatibility issues with older versions of npm. Get both on windows here:

* [node 16.13.0](https://nodejs.org/en/)

## Installation

1. Clone the repository to your local computer

Using git bash, enter:

```
git clone git@github.dxc.com:Digital-Innovation-Lab-Asset/webcam-server.git
```

2. Install dependencies

To install all node packages, enter the following in command line while inside the app folder:

```
npm install
```

## Tests

The functionality of all endpoints of the api were tested. The results of the endpoints for getting image and video files were as follows:

| No. | Endpoint | Results |
| ------ | ------ | ------ |
| 1 | /snapshot | <ul><li>a binary image file of the webcam snapshot was returned.</li><li>Time taken: ~0.9s</li></ul> |
| 2 | /start_rec?time=2 | <ul><li>a 2 second video was returned</li><li>Time taken: ~2.9s</li></ul> |
| 3 | /stop_rec | a video is returned of length depending on how long ago the /start_rec endpoint was called

The file used for testing is located in the `test` folder.

## Usage

### Configuration

The configuration files are located in `config.json` inside the `config` folder. The configuration file contains 4 keys:

1. `camera_config` - contains subkeys that relate to how the api interacts with the camera module.
  - `enabled` - set to false to disable the camera entirely. This key was made that the camera module can be entirely disabled for convenience if and when it is integrated into a different application.
  - `initialize` - when set to true, the camera is turned on when the app is started. The camera can also be turned on after the app starts by using the `get_start_camera` command.
  - `options` - Contains the main configuration options for the camera, mainly the format of image returned, as well as the height and width of the image. The port here defines the port of the headless browser that this app uses to activate the camera. The full list of options can be found here: https://github.com/cancerberoSgx/camera-capture/blob/master/docs/interfaces/_types_.captureoptions.md
2. `commands` - contains subkeys that determine the path parts of the urls needed to use api. For example: `http://example-domain.com<path>`. Unless otherwise stated, all json responses have only one key, the `text` key, which contains the actual response.
  - `get_help` - `GET` the list of api commands.
  - `get_is_ready` - `GET` whether the camera is ready to be used as a json response.
  - `get_pause_camera` - `GET` the api to pause the camera, reducing cpu usage.
  - `get_resume_camera` - `GET` the api to resume the camera.
  - `get_snapshot` - `GET` the api to send a binary jepg image of the current camera frame.
  - `get_start_camera` - `GET` the api to startup the camera. Mainly used if the camera is not configured to initialize itself on app start.
  - `get_start_recording` - `GET` the api to start recording video using the webcam. It can be made to return a video X seconds long by appending a time parameter to the end of the url. For example, it can be made to return a 3 second video using `?time=3`.
  - `get_stop_camera` - `GET` the api to turn off the camera. Once off, the camera has to be restarted using the `get_start_camera` endpoint.
  - `get_stop_recording` - `GET` the api to return a webm video file recorded by the webcam since `get_start_recording` was triggered. If `get_start_recording` was not triggered beforehand, a json response reminding the user to trigger it first is returned instead.
4. `log_prefix` - the prefix when this app prints to the console log.
5. `port` - the port the app runs on.

### Deployment

To start the app, in the command line enter:

```
npm start
```

A sample windows `.bat` file has also been provided if it is preferred.

## Known issues

After the first video is recorded, subsequent attempts to record more videos will return an unreadable file. The cause of this is unknown, but this app works around the issue by restarting the camera after a video is recorded. This will appear as the camera light turning off and on again after video recordings.
