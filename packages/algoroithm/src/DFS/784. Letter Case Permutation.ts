export {}
function letterCasePermutation(s: string): string[] {
  if (!s) return []
  const res: string[] = []
  _helper(s, 0, res)
  return res
}

function _helper(s: string, index: number, res: string[]) {
  if (index === s.length) {
    return res.push(s)
  }
  _helper(s, index + 1, res)
  if (/[a-z]/.test(s[index])) {
    // lowercase
    _helper(
      `${s.substring(0, index)}${s[index].toUpperCase()}${s.substring(
        index + 1,
      )}`,
      index + 1,
      res,
    )
  } else if (/[A-Z]/.test(s[index])) {
    // uppercase
    _helper(
      `${s.substring(0, index)}${s[index].toLowerCase()}${s.substring(
        index + 1,
      )}`,
      index + 1,
      res,
    )
  }
}

function main() {
  const s = 'a1b2'
  console.log(letterCasePermutation(s))
}

main()
