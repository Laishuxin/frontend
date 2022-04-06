export {}
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     If value is provided, then it holds a single integer
 *     Otherwise it holds an empty nested list
 *     constructor(value?: number) {
 *         ...
 *     };
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     isInteger(): boolean {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     getInteger(): number | null {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     setInteger(value: number) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     add(elem: NestedInteger) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds,
 *     or an empty list if this NestedInteger holds a single integer
 *     getList(): NestedInteger[] {
 *         ...
 *     };
 * };
 */

class NestedInteger {
  // If value is provided, then it holds a single integer
  // Otherwise it holds an empty nested list
  constructor(value?: number) {
    // ...
  }

  // Return true if this NestedInteger holds a single integer, rather than a nested list.
  isInteger(): boolean {
    // ...
    return true
  }

  // Return the single integer that this NestedInteger holds, if it holds a single integer
  // Return null if this NestedInteger holds a nested list
  getInteger(): number | null {
    // ...
    return null
  }

  // Set this NestedInteger to hold a single integer equal to value.
  setInteger(value: number) {
    // ...
  }

  // Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
  add(elem: NestedInteger) {
    // ...
  }

  // Return the nested list that this NestedInteger holds,
  // or an empty list if this NestedInteger holds a single integer
  getList(): NestedInteger[] {
    // ...
    return []
  }
}

class NestedIterator {
  private list: number[] = []
  private it: number = 0
  constructor(private nestedList: NestedInteger[]) {
    this.dfs(nestedList)
  }
  private dfs(nestedList: NestedInteger[]) {
    nestedList.forEach(list => {
      if (list.isInteger()) this.list.push(list.getInteger())
      else this.dfs(list.getList())
    })
  }
  hasNext(): boolean {
    return this.it < this.list.length
  }

  next(): number {
    return this.list[this.it++]
  }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new NestedIterator(nestedList)
 * var a: number[] = []
 * while (obj.hasNext()) a.push(obj.next());
 */
