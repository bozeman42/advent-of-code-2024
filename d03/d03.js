const path = require('path')

const { readInput } = require('../utils')

const dataStr = readInput(path.resolve(__dirname, 'input.txt'))

const mulRegex = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g

const DO = 'do'
const DO_NOT = 'do_not'

const data = [...dataStr.matchAll(mulRegex)].map((item) => {
  const [_, __, xStr, yStr, doCommand, do_not] = item
  if (xStr && yStr) return parseInt(xStr) * parseInt(yStr)
  if (doCommand) return DO
  if (do_not) return DO_NOT
})

let execute = true
const total = data.reduce((acc, item) => {
  if (item === DO) {
    execute = true
    return acc
  }
  if (item === DO_NOT) {
    execute = false
    return acc
  }
  if (!execute) return acc
  return acc + item
}, 0)

console.log(total)