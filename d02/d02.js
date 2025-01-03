const path = require('path')

const { readInput } = require('../utils')

const dataStr = readInput(path.resolve(__dirname, 'input.txt'))

const data = dataStr.split(/[\r\n]+/).map(line => line.split(' ').map(x => parseInt(x)))

function getSign(diff) {
  if (diff > 0) return 'pos'
  if (diff < 0) return 'neg'
  return 'unch'
}

const safeReports = data.filter(line => {
  let sign = undefined
  let success = false
  for (let j = -1; j < line.length; j++) {
    let report = line.filter((item, index) => index !== j)
    if (success) {
      if (j > 0) {
        console.log(j)
        console.log(line, report)
      }
      return true
    }
    success = true
    for (let i = 0; i < report.length - 1; i++) {
      let curr = report[i]
      let next = report[i+1]
      let diff = curr - next
  
      if (i === 0) {
        sign = getSign(diff)
      }
  
      if (sign === 'unch') {
        success = false
        break
      }
      if (getSign(diff) !== sign) {
        success = false
        break
      }
      let magnitude = Math.abs(diff)
      if (magnitude < 1 || magnitude > 3) {
        success = false
        break
      }
    }
    if (success) return true
  }
})

console.log(safeReports.length)