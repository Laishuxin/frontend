export {}
function combine(n: number, k: number): number[][] {
  const res: number[][] = []
  dfs(res, 1, n, k, [])
  return res
}

function dfs(
  res: number[][],
  start: number,
  n: number,
  k: number,
  path: number[],
) {
  if (path.length === k) {
    return res.push([...path])
  }

  for (let i = start; i <= n; i++) {
    path.push(i)
    dfs(res, i + 1, n, k, path)
    path.pop()
  }
}

function main() {
  // let n = 4, k = 2
  console.log(combine(4, 2))
}
main()
