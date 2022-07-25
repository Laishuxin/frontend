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

function _diameterOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0
  return Math.max(
    depth(root.left) + depth(root.right),
    diameterOfBinaryTree(root.left),
    diameterOfBinaryTree(root.right),
  )
}

function depth(root: TreeNode | null): number {
  if (!root) return 0
  return 1 + Math.max(depth(root.left), depth(root.right))
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let res = 0

  function depth(root: TreeNode | null): number {
    if (!root) return 0

    const leftDepth = depth(root.left)
    const rightDepth = depth(root.right)
    res = Math.max(leftDepth + rightDepth, res)
    return 1 + Math.max(leftDepth, rightDepth)
  }

  depth(root)
  return res
}
