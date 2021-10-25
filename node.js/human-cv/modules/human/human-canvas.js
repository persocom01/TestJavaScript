const fs = require('fs');
const process = require('process');
const log = require('@vladmandic/pilogger');
const canvas = require('canvas');
require('@tensorflow/tfjs-node'); // for nodejs, `tfjs-node` or `tfjs-node-gpu` should be loaded before using Human
const Human = require('./dist/human.node.js').default; // this is 'const Human = require('../dist/human.node-gpu.js').default;'

// const config = { // just enable all and leave default settings
//   backend: 'tensorflow',
//   modelBasePath: 'file://human/models/',
//   debug: false,
//   face: { enabled: true }, // includes mesh, iris, emotion, descriptor
//   hand: { enabled: true, maxDetected: 2, minConfidence: 0.5, detector: { modelPath: 'file://human/models/handtrack.json' } }, // use alternative hand model
//   body: { enabled: true },
//   object: { enabled: true },
//   gestures: { enabled: true },
// };

const config = {
  backend: 'tensorflow',
  modelBasePath: 'file://modules/human/models/',
  debug: true,
  async: false,
  filter: {
    enabled: true,
    flip: true,
  },
  face: {
    enabled: false,
    detector: { rotation: false },
    mesh: { enabled: true },
    iris: { enabled: true },
    description: { enabled: true },
    emotion: { enabled: true },
  },
  hand: {
    enabled: true,
    maxDetected: 2,
    minConfidence: 0.5,
    detector: { modelPath: 'file://modules/human/models/handtrack.json' }
  },
  // body: { modelPath: 'blazepose.json', enabled: true },
  body: { enabled: true },
  object: { enabled: false },
};

async function init() {
  // create instance of human
  human = new Human(config);
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

function getAngleBetweenLines(lineA, lineB) {
  const dot = (vA, vB) => vA.map((x, i) => vA[i] * vB[i]).reduce((m, n) => m + n);
  const vA = [(lineA[0][0]-lineA[1][0]), (lineA[0][1]-lineA[1][1])]
  const vB = [(lineB[0][0]-lineB[1][0]), (lineB[0][1]-lineB[1][1])]
  const dot_prod = dot(vA, vB)
  const magA = Math.pow(dot(vA, vA), 0.5)
  const magB = Math.pow(dot(vB, vB), 0.5)
  const cos_ = dot_prod/magA/magB
  const angle = Math.acos(dot_prod/magB/magA)
  const ang_deg = angle * 180 / Math.PI
  return ang_deg
}

function openClosedGesture(bodyKeypoints, angle) {
  const leftShoulder = bodyKeypoints.find((a) => (a.part === 'leftShoulder')).position;
  const leftElbow = bodyKeypoints.find((a) => (a.part === 'leftElbow')).position;
  const leftHip = bodyKeypoints.find((a) => (a.part === 'leftHip')).position;
  const result = getAngleBetweenLines([leftShoulder, leftElbow], [leftShoulder, leftHip])
  return result
}

async function main(input, output) {
  log.header();

  globalThis.Canvas = canvas.Canvas; // patch global namespace with canvas library
  globalThis.ImageData = canvas.ImageData; // patch global namespace with canvas library
  // human.env.Canvas = canvas.Canvas; // alternatively monkey-patch human to use external canvas library
  // human.env.ImageData = canvas.ImageData; // alternatively monkey-patch human to use external canvas library

  await init();

  // parse cmdline
  if (input.length === 0 && output.length === 0) log.error('Parameters: <input-image> <output-image> missing');
  else if (!fs.existsSync(input) && !input.startsWith('http')) log.error(`File not found: ${f}`);
  else {
    // everything seems ok
    const inputImage = await canvas.loadImage(input); // load image using canvas library
    log.info('Loaded image', input, inputImage.width, inputImage.height);
    const inputCanvas = new canvas.Canvas(inputImage.width, inputImage.height); // create canvas
    const ctx = inputCanvas.getContext('2d');
    ctx.drawImage(inputImage, 0, 0); // draw input image onto canvas

    // run detection
    const buffer = fs.readFileSync(input);
    const tensor = buffer2tensor(buffer);
    const result = await human.detect(tensor);

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
        console.log(openClosedGesture(body.keypoints, 45))
        for (let i = 0; i < body.keypoints.length; i++) {
          console.dir(body.keypoints[i]);
        }
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

    // run segmentation
    // const seg = await human.segmentation(inputCanvas);
    // log.data('Segmentation:', { data: seg.data.length, alpha: typeof seg.alpha, canvas: typeof seg.canvas });

    // print results summary
    const persons = result.persons; // invoke persons getter, only used to print summary on console
    for (let i = 0; i < persons.length; i++) {
      const face = persons[i].face;
      const faceTxt = face ? `score:${face.score} age:${face.age} gender:${face.gender} iris:${face.iris}` : null;
      const body = persons[i].body;
      const bodyTxt = body ? `score:${body.score} keypoints:${body.keypoints?.length}` : null;
      log.data(`Detected: #${i}: Face:${faceTxt} Body:${bodyTxt} LeftHand:${persons[i].hands.left ? 'yes' : 'no'} RightHand:${persons[i].hands.right ? 'yes' : 'no'} Gestures:${persons[i].gestures.length}`);
    }

    // draw detected results onto canvas and save it to a file
    human.draw.all(inputCanvas, result); // use human build-in method to draw results as overlays on canvas
    const outFile = fs.createWriteStream(output); // write canvas to new image file
    outFile.on('finish', () => log.state('Output image:', output, inputCanvas.width, inputCanvas.height));
    outFile.on('error', (err) => log.error('Output error:', output, err));
    const stream = inputCanvas.createJPEGStream({ quality: 0.5, progressive: true, chromaSubsampling: true });
    stream.pipe(outFile);
  }
}

module.exports = { main }
