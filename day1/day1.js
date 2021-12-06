console.log(
  require('fs')
  .readFileSync('day1.txt')
  .toString()
  .split('\n')
  .reduce(([prev, count], e) => (
    !isNaN(parseInt(e)) ?
    prev === null 
      ? [parseInt(e), 0] 
      : parseInt(e) > prev 
        ? [parseInt(e), count + 1]
        : [parseInt(e), count]
    : [prev, count]), [null, 0])[1]
)
