/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function _hasCycle(head: ListNode | null): boolean {
  if (!head) return false
  const set = new Set<ListNode>()
  while (head) {
    if (set.has(head)) return true
    set.add(head)
    head = head.next
  }
  return false
}

function hasCycle(head: ListNode | null): boolean {
  if (!head) return false

  let p1 = head
  while (head && head.next) {
    p1 = head.next
    head = head.next.next
    if (p1 === head) return true
  }
  return false
}
