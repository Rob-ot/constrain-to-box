
# Constrain to Box

Given an outer box (e.g. `{width: 100, height: 100}`)

and an inner box (e.g. `{width: 40, height: 40, x: 80, y: 30}`)

it returns a new constrained inner box (e.g. `{width: 40, height: 40, x: 60, y: 30}`)

Using css props? Config your own props!

### Example

```javascript
import constrain from 'constrain-to-box'
const constrainCSS = constrain.config({x: 'left', y: 'top'/*, width: 'width', height: 'height'*/})

const inner = {width: 50, height: 50, left: 655, top: 655}
const outer = {width: 500, height: 500, left: 200, top: 200}
const result = constrainCSS(outer, inner)
assert.deepEqual(result, {width: 50, height: 50, left: 650, top: 650})

// Returns the original if no changes were made, otherwise a new object
// (does not modify passed in values)
const wasModified = result !== inner
```

### Why?

I wrote this code for various projects many times, now it's easy!

### Tests?

Mocha

```
npm install
npm test
```

