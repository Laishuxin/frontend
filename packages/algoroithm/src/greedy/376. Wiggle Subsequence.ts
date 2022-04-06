function wiggleMaxLength(nums: number[]): number {
  nums = unique(nums)
  // console.log('nums: ', nums)
  const len = nums.length
  if (len <= 2) return len
  let res = 2
  for (let i = 1; i + 1 < len; i++) {
    const a = nums[i - 1],
      b = nums[i],
      c = nums[i + 1]
    if ((b > a && b > c) || (b < a && b < c)) res++
  }

  return res
}

function unique(nums: number[]): number[] {
  const len = nums.length
  if (len <= 1) return [...nums]
  const res: number[] = [nums[0]]
  for (let i = 1; i < len; i++) {
    if (nums[i] !== res[res.length - 1]) {
      res.push(nums[i])
    }
  }

  return res
}

function test() {
  const res = wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])
  console.log('res: ', res)
}
test()
