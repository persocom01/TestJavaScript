Course 1 - Browser-based Models with TensorFlow.js – Examples and Exercises
===========================================================================

https://www.coursera.org/learn/browser-based-models-tensorflow/home/welcome

This repository contains the examples and exercises that accompany Course 1 - Browser-based Models with TensorFlow.js of the TensorFlow for Data and Deployment Specialization at Coursera.

# Setting Up

You will need to have an internet browser, an HTML editor, and a web server installed on your machine to run the examples and exercises. We recommend you use [Chrome](https://www.google.com/chrome/) as your internet browser,  [Brackets](http://brackets.io/) as your HTML editor and the [Web Server for Chrome App](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) as your web server. All of these are free and are available for various platforms including Windows, Mac OS, and Linux.

The exercise and example in Week 3 of this course also contains a Jupyter Notebook. To run this notebook you will need have installed Jupyter with Python 3, TensorFlow 2.0, Tensorflowjs, NumPy, and Matplotlib.  


Have fun learning TensorFlow.js!

```
pip install tensorflow
pip install tensorflowjs
pip install prompt_toolkit==3.0.3
```

pretrained tsjs models can be found here: https://github.com/tensorflow/tfjs-models

one exercise requires https://eternallybored.org/misc/wget/ to download a dataset from kaggle.

To use face-api.js, include the following into the html page:

```
<script src="face-api.js"></script>
```

https://github.com/justadudewhohacks/face-api.js

# Model conversion

tensorflow, keras HDF5 and tensorflow hub modules can be converted to tfjs models. To convert a model:

1. Navigate to the directory with the model folder using cmd with tfjs installed. To get the folder address, right click on the address bar in explorer and choose copy address:

2. Use the tensorflowjs_converter command line utility to convert the model.

```
tensorflowjs_converter --input_format=tf_saved_model in_model_dir_name out_model_dir_name
```

The most important parameter is input_format, which should be defined in the following manner:

| model type | input_format |
| ------ | ------ |
| SavedModel | tf_saved_model |
| TensorFlow Hub module | tf_hub |
| TensorFlow.js JSON | tfjs_layers_model |
| Keras HDF5 | keras |
