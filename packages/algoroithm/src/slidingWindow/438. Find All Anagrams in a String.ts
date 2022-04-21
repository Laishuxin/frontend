export {}

function findAnagrams(s: string, p: string): number[] {
  if (!p || p.length > s.length) return []

  const res = []
  let left = 0,
    right = 0,
    valid = 0
  const need = Object.create(null)
  const windows = Object.create(null)
  let char
  while (left < p.length) {
    char = p[left++]
    need[char] = need[char] ? need[char] + 1 : 1
  }
  left = 0

  const needLen = Object.keys(need).length
  while (right < s.length) {
    char = s[right++]

    if (need[char]) {
      windows[char] = windows[char] ? windows[char] + 1 : 1
      if (windows[char] === need[char]) valid++
    }

    if (valid === needLen) res.push(left)
    while (right - left >= p.length) {
      char = s[left++]

      if (need[char]) {
        if (windows[char] === need[char]) valid--

        windows[char]--
      }
    }
  }

  return res
}
