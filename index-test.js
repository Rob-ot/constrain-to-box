
const assert = require('assert')
const constrain = require('./index')

describe('constrain', function() {
  it('is a function', function() {
    assert.ok(typeof constrain === 'function')
  })

  it('exists', function() {
    assert.ok(constrain)
  })

  it('does nothing to a inner box thats alreary inside the outer box', function() {
    const inner = {width: 50, height: 50, x: 210, y: 210}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.equal(result, inner)
  })

  it('moves box thats out of bounds to the top', function() {
    const inner = {width: 50, height: 50, x: 210, y: 120}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 210, y: 200})
  })

  it('moves box thats out of bounds to the top and right', function() {
    const inner = {width: 50, height: 50, x: 655, y: 120}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 650, y: 200})
  })

  it('moves box thats out of bounds to the right', function() {
    const inner = {width: 50, height: 50, x: 655, y: 210}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 650, y: 210})
  })

  it('moves box thats out of bounds to the bottom and right', function() {
    const inner = {width: 50, height: 50, x: 655, y: 655}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 650, y: 650})
  })

  it('moves box thats out of bounds to the bottom', function() {
    const inner = {width: 50, height: 50, x: 210, y: 655}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 210, y: 650})
  })

  it('moves box thats out of bounds to the bottom and left', function() {
    const inner = {width: 50, height: 50, x: 655, y: 220}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 650, y: 220})
  })

  it('moves box thats out of bounds to the left', function() {
    const inner = {width: 50, height: 50, x: 110, y: 220}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 200, y: 220})
  })

  it('moves box thats out of bounds to the top and left', function() {
    const inner = {width: 50, height: 50, x: 120, y: 120}
    const outer = {width: 500, height: 500, x: 200, y: 200}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 200, y: 200})
  })


  it('defaults outer box x and y to 0 for top and left', function() {
    const inner = {width: 50, height: 50, x: -10, y: -10}
    const outer = {width: 500, height: 500}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 0, y: 0})
  })

  it('defaults outer box x and y to 0 for bottom and right', function() {
    const inner = {width: 50, height: 50, x: 455, y: 455}
    const outer = {width: 500, height: 500}
    const result = constrain(outer, inner)
    assert.deepEqual(result, {width: 50, height: 50, x: 450, y: 450})
  })


  it('allows configing custom options for top and left', function() {
    const configedConstrain = constrain.config({
      width: 'w',
      height: 'h',
      x: 'left',
      y: 'top'
    })
    const inner = {w: 50, h: 50, left: -10, top: -10}
    const outer = {w: 500, h: 500}
    const result = configedConstrain(outer, inner)
    assert.deepEqual(result, {w: 50, h: 50, left: 0, top: 0})
  })

  it('allows configing custom options for bottom and right', function() {
    const configedConstrain = constrain.config({
      width: 'w',
      height: 'h',
      x: 'left',
      y: 'top'
    })
    const inner = {w: 50, h: 50, left: 455, top: 455}
    const outer = {w: 500, h: 500}
    const result = configedConstrain(outer, inner)
    assert.deepEqual(result, {w: 50, h: 50, left: 450, top: 450})
  })
})
