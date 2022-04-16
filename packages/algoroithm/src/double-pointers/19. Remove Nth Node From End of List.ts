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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return null
  const dummy = new ListNode(-1, head)
  const last = findLast(head, n + 2)
  last.next = last.next.next

  return dummy.next
}

function findLast(head: ListNode, n: number) {
  let p1 = head,
    p2 = head
  while (n-- && p1) p1 = p1.next

  while (p1) {
    p1 = p1.next
    p2 = p2.next
  }
  return p2
}
