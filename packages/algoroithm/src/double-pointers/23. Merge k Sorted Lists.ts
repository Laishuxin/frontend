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
export {}
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function mergeTwoLists(list1: ListNode, list2): ListNode {
  const dummy = new ListNode()
  let curr = dummy
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1
      list1 = list1.next
    } else {
      curr.next = list2
      list2 = list2.next
    }
    curr = curr.next
  }

  while (list1) {
    curr.next = list1
    list1 = list1.next
    curr = curr.next
  }
  while (list2) {
    curr.next = list2
    list2 = list2.next
    curr = curr.next
  }
  curr.next = null

  return dummy.next
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  lists = lists.filter(list => !!list)
  const len = lists.length
  if (len === 0) return null
  if (len === 1) return lists[0]
  let curr = lists[0]
  for (let i = 1; i < len; i++) {
    // const currList = lists[i]
    curr = mergeTwoLists(curr, lists[i])
  }

  return curr
}
