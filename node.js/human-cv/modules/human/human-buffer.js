const log = require('@vladmandic/pilogger');
const fs = require('fs');
const path = require('path');
const process = require('process');

let fetch; // fetch is dynamically imported later

// for NodeJS, `tfjs-node` or `tfjs-node-gpu` should be loaded before using Human
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const tf = require('@tensorflow/tfjs-node'); // or const tf = require('@tensorflow/tfjs-node-gpu');

// load specific version of Human library that matches TensorFlow mode
const Human = require('./dist/human.node.js').default; // or const Human = require('../dist/human.node-gpu.js').default;

let human = null;

const myConfig = {
  backend: 'tensorflow',
  modelBasePath: 'file://modules/human/models/',
  debug: true,
  async: false,
  filter: {
    enabled: true,
    flip: true,
  },
  face: {
    enabled: true,
    detector: { rotation: false },
    mesh: { enabled: true },
    iris: { enabled: true },
    description: { enabled: true },
    emotion: { enabled: true },
  },
  hand: {
    enabled: false,
  },
  // body: { modelPath: 'blazepose.json', enabled: true },
  body: { enabled: false },
  object: { enabled: false },
};

async function init() {
  // create instance of human
  human = new Human(myConfig);
  // wait until tf is ready
  await human.tf.ready();
  // pre-load models
  log.info('Human:', human.version);
  // log.info('Active Configuration', human.config);
  await human.load();
  const loaded = Object.keys(human.models).filter((a) => human.models[a]);
  log.info('Loaded:', loaded);
  log.info('Memory state:', human.tf.engine().memory());
}

// decode image using tfjs-node so we don't need external dependencies
// can also be done using canvas.js or some other 3rd party image library
function buffer2tensor(buffer) {
  return human.tf.tidy(() => {
    if (!buffer) return null;
    const decode = human.tf.node.decodeImage(buffer, 3);
    let expand;
    if (decode.shape[2] === 4) { // input is in rgba format, need to convert to rgb
      const channels = human.tf.split(decode, 4, 2); // tf.split(tensor, 4, 2); // split rgba to channels
      const rgb = human.tf.stack([channels[0], channels[1], channels[2]], 2); // stack channels back to rgb and ignore alpha
      expand = human.tf.reshape(rgb, [1, decode.shape[0], decode.shape[1], 3]); // move extra dim from the end of tensor and use it as batch number instead
    } else {
      expand = human.tf.expandDims(decode, 0); // inpur ia rgb so use as-is
    }
    const cast = human.tf.cast(expand, 'float32');
    return cast;
  });
}

async function detect(buffer) {

  const tensor = buffer2tensor(buffer);

  // image shape contains image dimensions and depth
  log.state('Processing:', tensor['shape']);

  // run actual detection
  let result;
  try {
    result = await human.detect(tensor, myConfig);
  } catch (err) {
    log.error('caught');
  }

  // dispose image tensor as we no longer need it
  human.tf.dispose(tensor);

  // print data to console
  log.data('Results:');
  if (result && result.face && result.face.length > 0) {
    for (let i = 0; i < result.face.length; i++) {
      const face = result.face[i];
      const emotion = face.emotion.reduce((prev, curr) => (prev.score > curr.score ? prev : curr));
      log.data(`  Face: #${i} boxScore:${face.boxScore} faceScore:${face.faceScore} age:${face.age} genderScore:${face.genderScore} gender:${face.gender} emotionScore:${emotion.score} emotion:${emotion.emotion} iris:${face.iris}`);
    }
  } else {
    log.data('  Face: N/A');
  }
  if (result && result.body && result.body.length > 0) {
    for (let i = 0; i < result.body.length; i++) {
      const body = result.body[i];
      log.data(`  Body: #${i} score:${body.score} keypoints:${body.keypoints?.length}`);
    }
  } else {
    log.data('  Body: N/A');
  }
  if (result && result.hand && result.hand.length > 0) {
    for (let i = 0; i < result.hand.length; i++) {
      const hand = result.hand[i];
      log.data(`  Hand: #${i} score:${hand.score} keypoints:${hand.keypoints?.length}`);
    }
  } else {
    log.data('  Hand: N/A');
  }
  if (result && result.gesture && result.gesture.length > 0) {
    for (let i = 0; i < result.gesture.length; i++) {
      const [key, val] = Object.entries(result.gesture[i]);
      log.data(`  Gesture: ${key[0]}#${key[1]} gesture:${val[1]}`);
    }
  } else {
    log.data('  Gesture: N/A');
  }
  if (result && result.object && result.object.length > 0) {
    for (let i = 0; i < result.object.length; i++) {
      const object = result.object[i];
      log.data(`  Object: #${i} score:${object.score} label:${object.label}`);
    }
  } else {
    log.data('  Object: N/A');
  }

  // print data to console
  if (result) {
    // invoke persons getter
    const persons = result.persons;

    // write result objects to file
    // fs.writeFileSync('result.json', JSON.stringify(result, null, 2));

    log.data('Persons:');
    for (let i = 0; i < persons.length; i++) {
      const face = persons[i].face;
      const faceTxt = face ? `score:${face.score} age:${face.age} gender:${face.gender} iris:${face.iris}` : null;
      const body = persons[i].body;
      const bodyTxt = body ? `score:${body.score} keypoints:${body.keypoints?.length}` : null;
      log.data(`  #${i}: Face:${faceTxt} Body:${bodyTxt} LeftHand:${persons[i].hands.left ? 'yes' : 'no'} RightHand:${persons[i].hands.right ? 'yes' : 'no'} Gestures:${persons[i].gestures.length}`);
    }
  }

  return result;
}

async function test() {
  process.on('unhandledRejection', (err) => {
    // @ts-ignore // no idea if exception message is compelte
    log.error(err?.message || err || 'no error message');
  });

  // test with embedded full body image
  let result;

  log.state('Processing embedded warmup image: face');
  myConfig.warmup = 'face';
  result = await human.warmup(myConfig);

  log.state('Processing embedded warmup image: full');
  myConfig.warmup = 'full';
  result = await human.warmup(myConfig);
  // no need to print results as they are printed to console during detection from within the library due to human.config.debug set
  return result;
}

async function main(f) {
  log.configure({ inspect: { breakLength: 265 } });
  log.header();
  log.info('File location:', f);
  fetch = (await import('node-fetch')).default;
  await init();
  await test();
  await detect(f)
  return 'success'
}

module.exports = { main }
