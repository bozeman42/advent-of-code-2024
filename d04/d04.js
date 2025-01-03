const path = require('path')

const { readInput } = require('../utils')

const dataStr = readInput(path.resolve(__dirname, 'input.txt'))
const grid = dataStr.split(/[\r\n]+/).map(line => line.split(''))

let total = 0

function test(x, y) {
  let sub = 0
  if (grid[y][x] !== 'X') return 0
  for (let vert = -1; vert < 2; vert++) {
    for (let horiz = -1; horiz < 2; horiz++) {
      sub += testDirection(x, y, horiz, vert)
    }
  }
  return sub
}

let XMAS = ['X','M','A','S']

function testDirection(x, y, vert, horiz) {
  if (y + (3)* vert >= grid.length || y + 3*vert < 0) return 0
  if (x + (3)* horiz >= grid[y].length || x + 3*horiz < 0) return 0
  for (let i = 1; i < 4; i++) {
    if (grid[y+(vert*i)][x+(horiz*i)] !== XMAS[i]) return 0
  }
  return 1
}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    total += test(x, y)
  }
}

console.log(total)
function testX(x, y) {
  if (grid[y][x] !== 'A') return 0
  let UL = grid[y-1][x-1]
  let DR = grid[y+1][x+1]
  let UR = grid[y-1][x+1]
  let DL = grid[y+1][x-1]
  if ('SMS'.includes(UL+DR) && 'SMS'.includes(UR+DL)) return 1
  return 0

}

let totalXmas = 0

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    totalXmas += testX(x, y)
  }
}

console.log(totalXmas)
