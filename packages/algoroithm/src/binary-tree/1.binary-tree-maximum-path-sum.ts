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

function maxPathSum(root: TreeNode | null): number {
  if (!root) return 0
  let res = Number.MIN_SAFE_INTEGER
  const max = Math.max
  function traveOneSide(node: TreeNode | null) {
    if (!node) return 0

    const left = max(traveOneSide(node.left), 0)
    const right = max(traveOneSide(node.right), 0)
    res = max(left + right + node.val, res)
    return max(left, right) + node.val
  }
  traveOneSide(root)
  return res
}

function test() {
  const root = new TreeNode(0)
  const result = maxPathSum(root)
  console.log('result: ', result)
}
test()
