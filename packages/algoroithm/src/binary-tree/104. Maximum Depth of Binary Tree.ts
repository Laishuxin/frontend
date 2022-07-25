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

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0
  // let res = 0
  // let depth = 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

function maxDepth2(root: TreeNode | null): number {
  let res = 0

  let depth = 0
  function traverse(root: TreeNode | null) {
    if (!root) return depth
    depth++
    res = Math.max(res, depth)
    traverse(root.left)
    traverse(root.right)
    depth--
  }
  traverse(root)

  return res
}
