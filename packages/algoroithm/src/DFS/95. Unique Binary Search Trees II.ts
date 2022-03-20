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
function generateTrees(n: number): Array<TreeNode | null> {
  if (!n) return []
  return dfs(1, n)
}

function dfs(left, right): TreeNode[] {
  if (left > right) {
    return [null]
  }
  const res = []
  for (let i = left; i <= right; i++) {
    const lChild = dfs(left, i - 1)
    const rChild = dfs(i + 1, right)
    lChild.forEach(lc => {
      rChild.forEach(rc => {
        res.push(new TreeNode(i, lc, rc))
      })
    })
  }
}
