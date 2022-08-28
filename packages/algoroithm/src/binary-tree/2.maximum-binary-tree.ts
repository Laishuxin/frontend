// export {}

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

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null
  const _max = Math.max(...nums)
  const index = nums.indexOf(_max)

  const root = new TreeNode(_max)
  root.left = constructMaximumBinaryTree(nums.slice(0, index))
  root.right = constructMaximumBinaryTree(nums.slice(index + 1, nums.length))
  return root
}

function test() {
  const nums = [3, 2, 1, 6, 0, 5]
  console.log(constructMaximumBinaryTree(nums))
}
test()
