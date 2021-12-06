const fs = require('fs')
const lines = fs.readFileSync('day4.txt').toString().split('\n')
const [first, ...rest] = lines
const numbersCalled = first
.split(',').map(e => +e)

const boards = []
let chunk = []
for (line of rest) {
  if (line == '') {
    boards.push(chunk)
    chunk = []
  } else {
    chunk.push(line.split(' ').filter(e => e.length > 0).map(e => +e))
  }
}
const rowBingo = board => called => board
  .reduce((winner, row) => row
    .every(e => called.includes(e)
    ) || winner, false)

const transpose = board => {
  const transposed = []
  const numColumns = board.length
  let column = []
  for (let i = 0; i < numColumns; i++) {
    for (const row of board) {
      column.push(row[i])
    }
    transposed.push(column)
    if (i < numColumns - 1) {
      column = []
    }
  }
  return transposed
}

const columnBingo = board => rowBingo(transpose(board))

const bingo = board => called => rowBingo(board)(called) ||
  columnBingo(board)(called)

let called = []
let winner = null 
let n = 0
while (called.length < numbersCalled.length && !winner) {

  called.push(numbersCalled[n])
  for (let j = 0; j < boards.length; j++) {
    board = boards[j]
    if (bingo(board)(called)) {
      winner = board
      break
    }
  }
  if (!winner) {
    n += 1
  }
}

const lastNumberCalled = called[called.length - 1]
const uncalledSum = winner
                  .reduce((nums, row) => nums
                    .concat(row), [])
                  .filter(e => !called.includes(e)) 
                  .reduce((a, e) => a + e, 0)

console.log(uncalledSum * lastNumberCalled)




      
