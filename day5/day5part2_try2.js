const fs = require('fs')

const data = fs.readFileSync('day5.txt').toString()
  .split('\n').filter(e => e != '')


const allPoints = points => {
  const pt1 = points[0]
  const pt2 = points[1]
  const segmentType = (pt1, pt2) => {
    if (pt1[0] == pt2[0]) {
      return 'vertical'
    }
    if (pt1[1] == pt2[1]) {
      return 'horizontal'
    }
    let leftPt
    let rightPt
    if (pt1[0] < pt2[0]) {
      leftPt = pt1
      rightPt = pt2
    } else {
      leftPt = pt2
      rightPt = pt1
    }
    if (leftPt[1] < rightPt[1]) {
      return 'positiveSlope'
    }
    if (leftPt[1] > rightPt[1]) {
      return 'negativeSlope'
    }
   }
  const verticalSeg = (pt1, pt2) => {
    if (pt1[1] < pt2[1]) {
      const result = []
      for (let y = pt1[1]; y < pt2[1] + 1; y++) {
        result.push([pt1[0], y])
      }
      return result
    }

    const result = []
    for (let y = pt2[1]; y < pt1[1] + 1; y++) {
      result.push([pt1[0], y])
    }
    return result
  }
  const horizontalSeg = (pt1, pt2) => {
    if (pt1[0] < pt2[0]) {
      const result = []
      for (let x = pt1[0]; x < pt2[0] + 1; x++) {
        result.push([x, pt1[1]])
      }
      return result
    }

    const result = []
    for (let x = pt2[0]; x < pt1[0] + 1; x++) {
      result.push([x, pt1[1]])
    }
    return result
  }

  const negSlope = (hi, lo) => {
    const result = []
    let x = lo[0]
    for (let y = lo[1]; y < hi[1] + 1; y++) {
      result.push([x, y])
      x--
    }
    return result

  }

  const posSlope = (lo, hi) => {
    const result = []
    let x = lo[0]
    for (let y = lo[1]; y < hi[1] + 1; y++) {
      result.push([x, y])
      x++
    }
    return result
  }
  const segType = segmentType(pt1, pt2)
  switch (segType) {
    case 'vertical':
      return verticalSeg(pt1, pt2)
    case 'horizontal':
      return horizontalSeg(pt1, pt2)
    case 'negativeSlope':
      // work from bottom up
      if (pt1[1] < pt2[1]) {
        return negSlope(pt2, pt1)
      } else {
        return negSlope(pt1, pt2)
      }
    case 'positiveSlope':
      // work from bottom up
      if (pt1[1] < pt2[1]) {
        return posSlope(pt1, pt2)
      } else {
        return posSlope(pt2, pt1)
      }
    default:
      return [pt1, pt2] 
  }

}
obj = {a: 1, b: 2}
const serialized = data
  .map(e => e
    .split(' -> ')
    .map(e => e
      .split(',')
      .map(e => +e)
    )
  ).map(allPoints)
  .reduce((a, e) => a.concat(e), [])
  .map(point => (console.log(`serializing point ${point[0]},${point[1]}`),`${point[0]},${point[1]}`))
  .join('\n')

const writeStream = fs.createWriteStream('day5IntermediateOutput.txt');
writeStream.write(serialized)


  
  //.filter(val => val > 1).length
