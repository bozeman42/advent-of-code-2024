const path = require('path')

const { readInput } = require('../utils')

const data = readInput(path.resolve(__dirname, 'input.txt')).split('\n').map(line => line.split(': '))
.reduce((arr, line) => {
  return [
    ...arr,
    {
      result: parseInt(line[0]),
      operands: line[1].split(' ').map(x => parseInt(x))
    }
  ]
}, [])

const OPERATORS = {
  add: (a, b) => a + b,
  mult: (a, b) => a * b,
  concatinate: (a, b) => parseInt(`${a}${b}`)
}

function evaluate(arr, target) {
  if (arr.length === 1) return arr[0] === target
  const x = arr.shift()
  const mult = [...arr]
  mult[0] *= x
  const add = [...arr]
  add[0] += x
  const cat = [...arr]
  cat[0] = OPERATORS.concatinate(x, cat[0])
  return (evaluate(mult, target) || evaluate(add, target) || evaluate(cat, target))
}

const calibration = data.reduce((total, { result, operands} ) => {
  return evaluate(operands, result) ? total + result : total
}, 0)

console.log(calibration)