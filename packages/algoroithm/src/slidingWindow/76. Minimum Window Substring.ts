export {}

function minWindow(s: string, t: string): string {
  if (t.length > s.length) return ''
  let left = 0,
    right = 0,
    valid = 0,
    start = 0,
    len = Number.MAX_SAFE_INTEGER

  const windows = Object.create(null)
  const need = Object.create(null)
  let char
  for (let i = 0; i < t.length; i++) {
    char = t[i]
    need[char] = need[char] ? need[char] + 1 : 1
  }

  const needLen = Object.keys(need).length
  while (right < s.length) {
    char = s[right++]
    if (need[char]) {
      windows[char] = windows[char] ? windows[char] + 1 : 1

      if (windows[char] === need[char]) valid++
    }

    while (valid === needLen) {
      if (right - left < len) {
        len = right - left
        start = left
      }

      char = s[left++]
      if (need[char]) {
        if (windows[char] === need[char]) valid--
        windows[char]--
      }
    }
  }

  return len === Number.MAX_SAFE_INTEGER ? '' : s.substring(start, start + len)
}

function main() {
  const res = minWindow('ADOBECODEBANC', 'ABC')
  console.log(res)
}
main()
