const log = require('@vladmandic/pilogger')

function getAngleBetweenLines (lineA, lineB) {
  const dot = (vA, vB) => vA.map((x, i) => vA[i] * vB[i]).reduce((m, n) => m + n)
  const vA = [(lineA[0][0] - lineA[1][0]), (lineA[0][1] - lineA[1][1])]
  const vB = [(lineB[0][0] - lineB[1][0]), (lineB[0][1] - lineB[1][1])]
  const dotProd = dot(vA, vB)
  const magA = Math.pow(dot(vA, vA), 0.5)
  const magB = Math.pow(dot(vB, vB), 0.5)
  const angle = Math.acos(dotProd / magB / magA)
  const angDeg = angle * 180 / Math.PI
  return angDeg
}

function openClosedPosture (result, angle) {
  if (result && result.body && result.body.length > 0) {
    for (let i = 0; i < result.body.length; i++) {
      const body = result.body[i]
      try {
        const leftShoulder = body.keypoints.find((a) => (a.part === 'leftShoulder')).position
        const leftElbow = body.keypoints.find((a) => (a.part === 'leftElbow')).position
        const leftHip = body.keypoints.find((a) => (a.part === 'leftHip')).position
        const rightShoulder = body.keypoints.find((a) => (a.part === 'rightShoulder')).position
        const rightElbow = body.keypoints.find((a) => (a.part === 'rightElbow')).position
        const rightHip = body.keypoints.find((a) => (a.part === 'rightHip')).position
        if (leftShoulder && leftElbow && leftHip && rightShoulder && rightElbow && rightHip) {
          const leftAng = getAngleBetweenLines([leftShoulder, leftElbow], [leftShoulder, leftHip])
          const rightAng = getAngleBetweenLines([rightShoulder, rightElbow], [rightShoulder, rightHip])
          log.data(`left arm angle: ${leftAng} right arm angle:${rightAng}`)
          if (leftAng >= angle && rightAng >= angle) {
            result.gesture.push({ body: i, gesture: 'open posture' })
          } else if (leftAng < angle && rightAng < angle) {
            result.gesture.push({ body: i, gesture: 'closed posture' })
          }
        }
      } catch (TypeError) {
        continue
      }
    }
    return result
  } else {
    return result
  }
}

function addGestures (result) {
  console.log(result.body[0])
  result = openClosedPosture(result, 25)
  return result
}

module.exports = { addGestures }
