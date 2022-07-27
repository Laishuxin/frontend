function minAddToMakeValid(s: string): number {
  const len = s.length
  if (!len) return 0

  let need = 0
  const stack = []
  for (let i = 0; i < len; i++) {
    const char = s[i]
    if (char === ')') {
      if (!stack.length) need++
      else stack.pop()
    } else {
      stack.push(char)
    }
  }

  return need + stack.length
}
