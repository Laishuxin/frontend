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

function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  if (!head) return null
  let p1 = head,
    p2 = head
  while (k-- && p1) {
    p1 = p1.next
  }
  while (p1) {
    p1 = p1.next
    p2 = p2.next
  }
  return p2
}
