export {}

function pyramidTransition(bottom: string, allowed: string[]): boolean {
  if (!allowed) return true
  const map: { [index: string]: string[] } = Object.create(null)

  allowed.forEach(allow => {
    const query = allow.substring(0, 2)
    map[query] = map[query] || []
    map[query].push(allow[2])
  })

  function dfs(bottom: string, top: string): boolean {
    if (bottom.length === 1) return true
    if (top.length + 1 === bottom.length) return dfs(top, '')

    // const query =
    const items = map[bottom.substring(top.length, top.length + 2)] || []
    for (let i = 0; i < items.length; i++) {
      if (dfs(bottom, top + items[i])) return true
    }

    return false
  }

  return dfs(bottom, '')
}
