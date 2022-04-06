export {}

function isSubsequence(s: string, t: string): boolean {
  if (!s) return true
  if (!t) return false
  const sLen = s.length
  const tLen = t.length
  let i = 0,
    j = 0

  while (i < sLen && j < tLen) {
    for (; j < tLen; j++) {
      if (s[i] === t[j]) {
        i++
        j++
        break
      }
    }
  }

  return i === sLen
}
