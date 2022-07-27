// "()())))()"
function minInsertions(s: string): number {
  const len = s.length

  let right = 0
  let res = 0

  for (let i = 0; i < len; i++) {
    const char = s[i]
    if (char === '(') {
      right += 2
      if (right % 2 === 1) {
        res++
        right--
      }
    } else {
      right--
      if (right === -1) {
        right = 1
        res++
      }
    }
  }

  return res + right
}
