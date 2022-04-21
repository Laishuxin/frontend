export {}

function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false
  let left = 0,
    right = 0,
    valid = 0

  const need = Object.create(null)
  const windows = Object.create(null)
  for (let i = 0; i < s1.length; i++) {
    const element = s1[i]
    need[element] = need[element] ? need[element] + 1 : 1
  }

  const needLen = Object.keys(need).length
  while (right < s2.length) {
    let char = s2[right++]

    if (need[char]) {
      windows[char] = windows[char] ? windows[char] + 1 : 1
      if (need[char] === windows[char]) valid++
    }

    if (valid === needLen) return true
    while (right - left >= s1.length) {
      char = s2[left++]
      if (need[char]) {
        if (windows[char] === need[char]) valid--
        windows[char]--
      }
    }
  }

  return false
}

function main() {
  checkInclusion('ab', 'eidbaooo')
}

main()
