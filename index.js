
const _ = require('lodash')

function constrainToBoxComposer(config) {

  const xKey = config.x || 'x'
  const yKey = config.y || 'y'
  const widthKey = config.width || 'width'
  const heightKey = config.height || 'height'

  return function constrainToBox(outerBox, innerBox) {

    let modifications = null

    const outerX = outerBox[xKey] || 0
    const outerY = outerBox[yKey] || 0

    if (innerBox[yKey] < outerY) {
      if (!modifications) modifications = {}
      modifications[yKey] = outerY
    }

    if (innerBox[xKey] < outerX) {
      if (!modifications) modifications = {}
      modifications[xKey] = outerX
    }

    if (innerBox[yKey] + innerBox[heightKey] > outerY + outerBox[heightKey] - innerBox[heightKey]) {
      if (!modifications) modifications = {}
      modifications[yKey] = outerY + outerBox[heightKey] - innerBox[heightKey]
    }

    if (innerBox[xKey] + innerBox[widthKey] > outerX + outerBox[widthKey] - innerBox[widthKey]) {
      if (!modifications) modifications = {}
      modifications[xKey] = outerX + outerBox[widthKey] - innerBox[widthKey]
    }



    if (modifications) {
      return _.extend({}, innerBox, modifications)
    }
    else {
      return innerBox
    }
  }
}

const constrainToBox = constrainToBoxComposer({})

// const constrainToBox = constrainToBoxComposer({
//   width: 'width',
//   height: 'height',
//   x: 'x',
//   y: 'y'
// })

constrainToBox.config = constrainToBoxComposer

module.exports = constrainToBox
