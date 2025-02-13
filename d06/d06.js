const path = require('path')

const { readInput } = require('../utils')

const map = readInput(path.resolve(__dirname, 'input.txt')).split('\n').map(line => line.split(''))

let guardYIndex
let guardXIndex
console.log(map)
const DIRECTIONS = {
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
  LEFT: [0, -1],
}

const OBSTRUCTION = '#'

const DIRECTION_ORDER = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT ]

let currentDirectionIndex = 0

function turn() {
  currentDirectionIndex = currentDirectionIndex < DIRECTION_ORDER.length - 1
    ? currentDirectionIndex + 1
    : 0
}

function inBounds() {
  if (
    guardYIndex < 0 
    || guardXIndex < 0
    || guardYIndex > map.length - 1
    || guardXIndex > map[0].length - 1
  ) {
    return false
  }
  return true
}

guardYIndex = map.findIndex(line => {
  guardXIndex = line.indexOf('^')
  return guardXIndex >= 0
})

console.log(guardXIndex, guardYIndex)

const positions = new Set()
let turned = false
do {
  if (!turned) {
    positions.add(JSON.stringify({
      x: guardXIndex,
      y: guardYIndex,
    }))
  }
  turned = false
  const [dY, dX] = DIRECTION_ORDER[currentDirectionIndex]
  if (map?.[guardYIndex + dY]?.[guardXIndex + dX] === OBSTRUCTION) {
    turn()
    turned = true
  } else {
    guardXIndex += dX
    guardYIndex += dY
  }
} while (inBounds())
  
console.log(positions.size)


let possibleLoops = Array.from(positions).map(point => JSON.parse(point))
possibleLoops.shift()
const loopObstructions = new Set()
  
for(let i = 0; i < possibleLoops.length; i++) {
  guardYIndex = map.findIndex(line => {
    guardXIndex = line.indexOf('^')
    return guardXIndex >= 0
  })
  currentDirectionIndex = 0
  let newMap = map.map(line => [...line])
  let loopPositions = new Set()
  const {y, x} = possibleLoops[i]
  newMap[y][x] = '#'
  turned = false
  do {
    if (!turned) {
      if (loopPositions.has(JSON.stringify({
        x: guardXIndex,
        y: guardYIndex,
        direction: DIRECTION_ORDER[currentDirectionIndex]
      }))) {
        loopObstructions.add(JSON.stringify(possibleLoops[i]))
      }
      loopPositions.add(JSON.stringify({
        x: guardXIndex,
        y: guardYIndex,
        direction: DIRECTION_ORDER[currentDirectionIndex]
      }))
    }
    turned = false
    const [dY, dX] = DIRECTION_ORDER[currentDirectionIndex]
    if (newMap?.[guardYIndex + dY]?.[guardXIndex + dX] === OBSTRUCTION) {
      turn()
      turned = true
    } else {
      guardXIndex += dX
      guardYIndex += dY
    }
  } while (inBounds() && !loopObstructions.has(JSON.stringify(possibleLoops[i])))
}
  
console.log(loopObstructions.size)