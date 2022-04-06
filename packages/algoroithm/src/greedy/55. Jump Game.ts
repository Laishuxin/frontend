export {}
function canJump(nums: number[]): boolean {
  const len = nums.length
  let max = -1
  let i = 0
  while (true) {
    max = Math.max(max, i + nums[i])
    if (max >= len - 1) return true
    else if (max === i + nums[i] && max === i) break
    i++
  }
  return max >= len - 1
}
