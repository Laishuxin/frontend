export {}
function decodeString(s: string): string {
  if (!s) return s
  let res: string = ''
  for (let i = 0; i < s.length; ) {
    const char = s[i]
    if (!isDigit(char)) {
      i++
      res += char
      continue
    }
    let j = i
    let count = 0
    while (isDigit(s[j])) {
      count = count * 10 + Number(s[j])
      j++
    }
    const start = j + 1
    let paren = 1
    while (paren) {
      j++
      if (s[j] === '[') {
        paren++
      } else if (s[j] === ']') {
        paren--
      }
    }
    while (count--) {
      res += decodeString(s.substring(start, j))
    }
    i = j + 1
  }
  return res
}

function isDigit(s: string): boolean {
  return /\d/.test(s)
}

function main() {
  console.log(decodeString('3[a]2[bc]'))
  console.log(decodeString('3[a2[c]]'))
}
main()
