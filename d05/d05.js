const path = require('path')

const { readInput } = require('../utils')

const dataStr = readInput(path.resolve(__dirname, 'input.txt'))

const [instructionStr, dataString] = dataStr.split('\n\n')

const instructions = instructionStr.split('\n').map(line => line.split('|'))
const data = dataString.split('\n').map(line => line.split(','))

// return true if passing. rules referencing missing pages pass.
function testLine(a, b, data) {
  const indexA = data.indexOf(a)
  const indexB = data.indexOf(b)
  if (indexA < 0 || indexB < 0) return true
  return indexA < indexB
}

const passingLines = data.filter(line => {
  return instructions.every(([a, b]) => {
    return testLine(a, b, line)
  })
})
const nonPassingLines = data.filter(line => {
  return !instructions.every(([a, b]) => {
    return testLine(a, b, line)
  })
})

function sortLine(a, b) {
  const relevantInstructions = instructions.filter(instruction => {
    return instruction.includes(a) && instruction.includes(b)
  })[0]
  return relevantInstructions.indexOf(a) - relevantInstructions.indexOf(b)
}

const result = passingLines.reduce((acc, line) => {
  const value = parseInt(line[Math.floor(line.length / 2)])
  return acc + value
}, 0)
const result2 = nonPassingLines.reduce((acc, line) => {
  const sorted = [...line].sort(sortLine)
  const value = parseInt(sorted[Math.floor(sorted.length / 2)])
  console.log(value)
  return acc + value
}, 0)

console.log(result, result2)