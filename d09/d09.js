const path = require('path')

const { readInput } = require('../utils')

const data = readInput(path.resolve(__dirname, 'input.txt')).split('').map(x => parseInt(x))

let disk = []
let maxIndex = 0
data.forEach((digit, index) => {
  let block = []
    for (let i = 0; i < digit; i++) {
      let fileIndex = index%2 ? null : index / 2
      maxIndex = fileIndex ?? maxIndex
      block.push(fileIndex)
    }
    disk.push(block)
})

// while (disk.some(block => block === null)) {
//   let lastBlock = disk.pop()
//   if (lastBlock !== null) {
//     disk[disk.indexOf(null)] = lastBlock
//   }
// }

function checksum(disk) {
  return disk.reduce((sum, block, index) => {
    return block ? sum + (block * index): sum
  })
}

let targetIndex = maxIndex

function movedFile(file, spaceSize) {
  const replacedSpace = new Array(2)
  replacedSpace[0] = file
  replacedSpace[1] = new Array(spaceSize - file.length).fill(null)
  return (replacedSpace)
}

while (targetIndex > 0) {
  let fileIndex = disk.findLastIndex(item => item.includes(targetIndex))

  let fileSize = disk[fileIndex].length

  let file = disk.splice(fileIndex, 1, new Array(fileSize).fill(null))[0]

  let spaceIndex = disk.findIndex(chunk => {
    return chunk.includes(null) && chunk.length >= fileSize
  })
  disk.splice(spaceIndex, 1, ...movedFile(file, disk[spaceIndex].length))
  targetIndex--
}
disk = disk.flat()
console.log(checksum(disk))