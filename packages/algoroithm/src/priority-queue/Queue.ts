export interface Queue<T> {
  enqueue(element: T): void
  dequeue(): T | null
  head(): T | null
}

export interface Comparator<T> {
  lessThan(a: T, b: T): boolean
}