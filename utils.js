const fs = require('fs')

const readInput = path => {
  return fs.readFileSync(path).toString()
}

module.exports = {
  readInput
}