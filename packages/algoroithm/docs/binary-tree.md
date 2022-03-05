# binary tree

## problem sets

### [binary-tree-maximum-path-sum](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.

From the top side, we can think that the answer is the following thinking:

- root.val
- root.val + maxPathSum(root.left)
- root.val + maxPathSum(root.right)
- root.val + maxPathSum(root.left) + maxPathSum(root.right)

We can simplify the question: the `maxPathSum` of left/right subtree is equal to 0 if they not exist. So the question can be transfer as maxPathSum(root) is equal to `root.val + traveOneSide(root.left) + traveOneSide(root.right)`

And `traveOneSide(node)` is equal to `max(traveOneSide(node.left), traveOneSide(node.right)) + node.val`
