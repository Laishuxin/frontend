function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length

  const windows = Object.create(null)
  let left = 0,
    right = 0,
    max = 0
  while (right < s.length) {
    let char = s[right++]
    windows[char] = windows[char] ? windows[char] + 1 : 1

    while (windows[char] > 1) {
      windows[s[left++]]--
    }
    max = Math.max(max, right - left)
  }
  return max
}
