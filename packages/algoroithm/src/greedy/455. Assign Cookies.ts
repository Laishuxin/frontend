function findContentChildren(g: number[], s: number[]): number {
  if (!s.length) return 0
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  let count = 0
  const gLen = g.length
  const sLen = s.length
  let i = 0,
    j = 0
  while (i < gLen && j < sLen) {
    const cookie = s[j]
    if (cookie >= g[i]) {
      i++
      count++
    }
    j++
  }
  return count
}
