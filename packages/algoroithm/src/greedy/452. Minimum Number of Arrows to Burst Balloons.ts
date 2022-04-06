function findMinArrowShots(points: number[][]): number {
  const len = points.length
  if (len <= 1) return len

  let count = 1
  points = points.sort((a, b) => a[1] - b[1])
  let end = points[0][1]
  for (let i = 1; i < len; i++) {
    const start = points[i][0]
    if (start > end) {
      count++
      end = points[i][1]
    }
  }
  return count
}
