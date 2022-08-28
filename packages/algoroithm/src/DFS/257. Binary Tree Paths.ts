export {}
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function binaryTreePaths(root: TreeNode | null): string[] {
  if (!root) return
  const res = []
  dfs(res, '', root)
  return res
}

function dfs(res: string[], path: string, root: TreeNode) {
  if (!root.left && !root.right) {
    res.push(`${path}${root.val}`)
    return
  }

  path = `${path}${root.val}->`
  root.left && dfs(res, path, root.left)
  root.right && dfs(res, path, root.right)
}
