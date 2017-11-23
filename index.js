
var _ = require('lodash')

function constrainToBoxComposer(config) {

  var xKey = config.x || 'x'
  var yKey = config.y || 'y'
  var widthKey = config.width || 'width'
  var heightKey = config.height || 'height'

  return function constrainToBox(outerBox, innerBox) {

    var modifications = null

    var outerX = outerBox[xKey] || 0
    var outerY = outerBox[yKey] || 0

    if (innerBox[yKey] < outerY) {
      if (!modifications) modifications = {}
      modifications[yKey] = outerY
    }

    if (innerBox[xKey] < outerX) {
      if (!modifications) modifications = {}
      modifications[xKey] = outerX
    }

    if (innerBox[yKey] + innerBox[heightKey] > outerY + outerBox[heightKey]) {
      if (!modifications) modifications = {}
      modifications[yKey] = outerY + outerBox[heightKey] - innerBox[heightKey]
    }

    if (innerBox[xKey] + innerBox[widthKey] > outerX + outerBox[widthKey]) {
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

var constrainToBox = constrainToBoxComposer({})
constrainToBox.config = constrainToBoxComposer

module.exports = constrainToBox
