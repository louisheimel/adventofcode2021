const fs = require('fs') 
const lines = fs.readFileSync('day4.txt').toString().split('\n')
const [first, ...rest] = lines
const numbersCalled = first
.split(',').map(e => +e)

let boards = [] 
let chunk = []
for (let i = 1; i < rest.length; i++) {
  const line = rest[i]
  if (line == '') {
    if (i < rest.length) {
      boards.push(chunk)
      chunk = []
    }
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

const winners = n => boards.filter(board => bingo(board)(numbersCalled.slice(0, n)))


const winnerSet = new Set()
let result = 0
let numbersCalledSoFar
let lastWinner
for (let i = 0; i < numbersCalled.length; i++) {
  const currentWinners = winners(i)
  // find number at which all boards are bingoed
  for (winner of currentWinners) {
    
    if (!winnerSet.has(winner.toString())) {
      lastWinner = winner
      numbersCalledSoFar = numbersCalled.slice(0, i)
      winnerSet.add(winner.toString())
    }
  }
}

const sum = (a, e) => a + e
const concatTwo = (a, e) => a.concat(e) 
const numberNotCalled = n => !numbersCalledSoFar.includes(n)
const winningNumbers = lastWinner.reduce(concatTwo, [])
const lastNumberCalled = numbersCalledSoFar[numbersCalledSoFar.length - 1]
const remainingNumbers = winningNumbers.filter(numberNotCalled)
const remainingSum = remainingNumbers.reduce((a, e) => a + e, 0)
console.log((remainingSum) * lastNumberCalled)
