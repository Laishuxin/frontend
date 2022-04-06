function eraseOverlapIntervals(intervals: number[][]): number {
  const len = intervals.length
  if (len <= 1) return len
  intervals = intervals.sort((a, b) => a[1] - b[1])
  let count = 1
  let end = intervals[0][1]
  for (let i = 1; i < len; i++) {
    const interval = intervals[i]
    const _start = interval[0]
    const _end = interval[1]
    if (_start >= end) {
      count++
      end = _end
    }
  }

  return len - count
}
