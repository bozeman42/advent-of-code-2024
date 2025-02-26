const path = require('path')

const { readInput } = require('../utils')

const data = readInput(path.resolve(__dirname, 'input.txt'))
  .split('\n')
  .map(line => line.split(''))
  
const yMax = data.length - 1
const xMax = data[0].length - 1

const antennaObj = data.reduce((obj, line, yIndex) => {
  line.forEach((char, xIndex) => {
    if (char === '.') return
    if (!obj[char]) {
      obj[char] = [[xIndex, yIndex]]
    } else {
      obj[char].push([xIndex, yIndex])
    }
  })
  return obj
}, {})

function inBounds(coord) {
  return coord >= 0 && coord <= yMax
}

const nodes = Object.values(antennaObj).reduce((nodeSet, antennaSet) => {
  while(antennaSet.length > 1) {
    const [x, y] = antennaSet.pop()
    antennaSet.forEach(([x1,y1]) => {
      const xDiff = x1 - x
      const yDiff = y1 - y
      let xNode = x1
      let yNode = y1
      do {
        nodeSet.add(`${xNode},${yNode}`)
        xNode += xDiff
        yNode += yDiff
      } while (inBounds(xNode) && inBounds(yNode))
        
      let xNode2 = x
      let yNode2 = y
      do {
        nodeSet.add(`${xNode2},${yNode2}`)
        xNode2 -= xDiff
        yNode2 -= yDiff
      } while (inBounds(xNode2) && inBounds(yNode2))
    })
  }
  
  return nodeSet
}, new Set())
console.log(nodes.size)