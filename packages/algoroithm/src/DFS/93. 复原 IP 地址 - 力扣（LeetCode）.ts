function restoreIpAddresses(s: string): string[] {
  const res: string[] = []
  dfs(res, s, '', 0, 0)
  return res
}
const zero = '0'.charCodeAt(0)

/**
 *
 * @param res
 * @param s
 * @param path 前 k  个有效的 IP 位。
 * @param i
 * @param k
 * @returns
 */
function dfs(res: string[], s: string, path: string, i: number, k: number) {
  if (i === s.length) {
    // .111.222.333.444
    if (k === 4) {
      // 111.222.333.444
      res.push(path.substring(1))
    }
    return
  }

  if (k > 4) return
  if (s.charAt(i) === '0') {
    // 0xx...  is invalid
    return dfs(res, s, `${path}.0`, i + 1, k + 1)
  }
  for (let t = 0; i < s.length; i++) {
    // for example: 25 * 10 + ('5' - '0')
    t = t * 10 + s.charCodeAt(i) - zero
    if (t < 256) {
      dfs(res, s, `${path}.${t}`, i + 1, k + 1)
    } else {
      break
    }
  }
}
