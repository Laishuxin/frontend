class MyStack {
  private queue: number[] = []
  private topEl: number
  constructor() {}

  push(x: number): void {
    this.topEl = x
    this.queue.push(this.topEl)
  }

  pop(): number {
    let len = this.queue.length - 1
    while (len) {
      const el = this.queue.shift()
      this.queue.push(el)
      len--
      if (!len) {
        this.topEl = el
      }
    }

    return this.queue.shift()
  }

  top(): number {
    return this.topEl
  }

  empty(): boolean {
    return !this.queue.length
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
