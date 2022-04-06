export {}

function jump(nums: number[]): number {
  const len = nums.length
  if (len === 1) return 0
  let left = 0,
    right = 0,
    count = 0
  while (left <= right) {
    let maxRight = 0
    for (let i = left; i <= right; i++) {
      maxRight = Math.max(maxRight, i + nums[i])
    }
    count++
    if (maxRight >= len - 1) break
    left = right + 1
    right = maxRight
  }

  return count
}
