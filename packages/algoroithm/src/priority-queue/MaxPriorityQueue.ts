import { Comparator, Queue } from './Queue'

export class MaxPriorityQueue<T> implements Queue<T> {
  private container: T[]
  private capacity: number
  private comparator: Comparator<T>
  private n: number

  constructor(comparator: Comparator<T>)
  constructor(capacity: number, comparator: Comparator<T>)
  constructor(...args: any[]) {
    if (typeof args[0] === 'number') {
      this.capacity = args[0]
      this.comparator = args[1]
    } else {
      this.capacity = 8
      this.comparator = args[0]
    }
    this.n = 0
    this.container = Array(this.capacity)
  }

  head(): T | null {
    return this.n ? this.container[1] : null
  }

  enqueue(element: T): void {
    this.container[++this.n] = element
    this.swim(this.n)
  }

  dequeue(): T | null {
    if (!this.n) return null
    const result = this.container[1]
    this.exch(1, this.n)
    this.container[this.n--] = null
    this.sink(1)
    return result
  }

  getElements() {
    return this.container
  }

  private swim(index: number) {
    while (
      index > 1 &&
      this.comparator.lessThan(this.parent(index), this.current(index))
    ) {
      this.exch(this.parentIndex(index), index)
      index = this.parentIndex(index)
    }
  }

  private sink(index: number) {
    const lessThan = this.comparator.lessThan
    while (this.leftIndex(index) <= this.n) {
      let older = this.leftIndex(index)
      if (
        this.rightIndex(index) <= this.n &&
        lessThan(this.left(index), this.right(index))
      ) {
        older = this.rightIndex(index)
      }
      if (lessThan(this.current(older), this.current(index))) break
      this.exch(older, index)
      index = older
    }
  }

  private current(index: number) {
    return this.container[index]
  }

  private parent(index: number) {
    return this.container[this.parentIndex(index)]
  }
  private parentIndex(index: number) {
    return Math.floor(index / 2)
  }

  private left(index: number) {
    return this.container[this.leftIndex(index)]
  }

  private leftIndex(index: number) {
    return 2 * index
  }

  private right(index: number) {
    return this.container[this.rightIndex(index)]
  }

  private rightIndex(index: number) {
    return 2 * index + 1
  }

  private exch(a: number, b: number) {
    const tmp = this.container[a]
    this.container[a] = this.container[b]
    this.container[b] = tmp
  }
}

function test() {
  const queue = new MaxPriorityQueue<number>({
    lessThan: (a, b) => a < b,
  })

  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.enqueue(4)
  queue.enqueue(5)
  console.log(queue.getElements())
  const res = queue.dequeue()
  console.log(queue.getElements())
  console.log('res: ', res)
}

test()
