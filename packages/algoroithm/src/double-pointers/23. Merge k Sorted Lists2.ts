// export {}

class PriorityQueue<T> {
  private container: T[]
  constructor(private comparator: (a: T, b: T) => number) {
    this.container = Array(1)
  }

  enqueue(el: T) {
    this.container.push(el)
    this.swim(this.container.length - 1)
  }

  dequeue(): T | null {
    if (this.container.length - 1) {
      const res = this.container[1]
      this.swap(1, this.container.length - 1)
      this.container.pop()
      this.sink(1)

      return res
    }
    return null
  }

  swim(k: number) {
    while (k > 1 && this.less(this.parent(k), this.current(k))) {
      const parentIndex = this.parentIndex(k)
      this.swap(parentIndex, k)
      k = parentIndex
    }
  }

  sink(k: number) {
    while (this.leftIndex(k) < this.container.length) {
      const leftIndex = this.leftIndex(k)
      const rightIndex = this.rightIndex(k)
      let max = leftIndex

      if (
        rightIndex < this.container.length &&
        this.less(this.left(k), this.right(k))
      ) {
        max = rightIndex
      }

      if (this.less(this.current(max), this.current(k))) break
      this.swap(k, max)
      k = max
    }
  }

  isEmpty() {
    return this.container.length <= 1
  }

  private parentIndex(k) {
    return Math.floor(k / 2)
  }
  private leftIndex(k) {
    return k * 2
  }
  private rightIndex(k) {
    return k * 2 + 1
  }
  private swap(a: number, b: number) {
    const tmp = this.container[a]
    this.container[a] = this.container[b]
    this.container[b] = tmp
  }
  private parent(k) {
    return this.container[this.parentIndex(k)]
  }
  private current(k) {
    return this.container[k]
  }
  private left(k) {
    return this.container[this.leftIndex(k)]
  }
  private right(k) {
    return this.container[this.rightIndex(k)]
  }

  private less(t1: T, t2: T) {
    return this.comparator(t1, t2) < 0
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  lists = lists.filter(list => !!list)
  const len = lists.length
  if (len === 0) return null
  if (len === 1) return lists[0]
  const queue = new PriorityQueue<ListNode>((a, b) => b.val - a.val)
  lists.forEach(list => {
    while (list) {
      queue.enqueue(list)
      const tmp = list
      list = list.next
      tmp.next = null
    }
  })
  const dummy = new ListNode()
  let curr = dummy

  while (!queue.isEmpty()) {
    curr.next = queue.dequeue()
    curr = curr.next
  }
  return dummy.next
}

function main() {
  const queue = new PriorityQueue((a: number, b: number) => b - a)
  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.enqueue(4)
  console.log(queue)
  // console.log(queue.dequeue())
  // console.log(queue)

  while (!queue.isEmpty()) {
    console.log(queue.dequeue())
    console.log(queue)
  }
}
main()
