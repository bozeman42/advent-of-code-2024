const path = require('path')

const { readInput } = require('../utils')

const data = readInput(path.resolve(__dirname, 'input.txt')).split('').map(x => parseInt(x))

let disk = []
data.forEach((digit, index) => {
    for (let i = 0; i < digit; i++) {
      disk.push(index%2 ? null : index / 2)
    }
})

while (disk.some(block => block === null)) {
  let lastBlock = disk.pop()
  if (lastBlock !== null) {
    disk[disk.indexOf(null)] = lastBlock
  }
}

function checksum(disk) {
  return disk.reduce((sum, block, index) => {
    return sum + (block * index)
  })
}



console.log(checksum(disk))