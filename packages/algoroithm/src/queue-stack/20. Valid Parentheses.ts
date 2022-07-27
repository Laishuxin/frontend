const map = {
  ')': '(',
  ']': '[',
  '}': '{',
}

function isValid(s: string): boolean {
  const len = s.length
  const stack = []
  for (let i = 0; i < len; i++) {
    const char = s[i]
    if (char === ')' || char === ']' || char === '}') {
      if (!stack.length) return false

      const top = stack.pop()
      if (top !== map[char]) return false
    } else {
      stack.push(char)
    }
  }
  return !stack.length
}
