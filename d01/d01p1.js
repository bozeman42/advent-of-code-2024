const path = require('path')

const { readInput } = require('../utils')

console.log(__dirname)

const dataStr = readInput(path.resolve(__dirname, 'input.txt'))

const data = dataStr.split(/[\r\n]+/).reduce((acc, line) => {
  const [l, r] = line.split(/\s+/)
  return {
    left: [
      ...acc.left,
      parseInt(l),
    ],
    right: [
      ...acc.right,
      parseInt(r)
    ]
  }
}, {
  left: [],
  right: []
})
console.time('part1')
data.left = data.left.sort((a, b) => a - b)
data.right = data.right.sort((a, b) => a - b)


let total = 0
for (let i = 0; i < data.left.length; i++) {
  total += Math.abs(data.left[i] - data.right[i])
}
console.log(total)
console.timeEnd('part1')
console.time('part2')
data.multiples = data.left.reduce((multiples, item) => {
  if (multiples[item]) return multiples
  multiples[item] = data.right.filter(rightData => rightData === item).length
  return multiples
}, {})
let total2 = 0
for (let i = 0; i < data.left.length; i++) {
  total2 += data.left[i] * data.multiples[data.left[i]]
}

console.log(total2)
console.timeEnd('part2')
