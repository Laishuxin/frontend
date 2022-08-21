import { isFunction, isObject } from 'lodash-es'
import { ReactiveEffect } from './effect'
import { isReactive } from './reactivity'
import { Fn } from './types'
import { warn } from './warn'

function traversal(value, seen = new Set()) {
  if (!isObject(value) && seen.has(value)) return value
  seen.add(value)

  for (const key in value) {
    traversal(value[key], seen)
  }

  return value
}

export const watch = <T>(
  source: Fn<any[], T> | T,
  callback: (
    newValue: T,
    oldValue: T,
    onCleanUp: Fn<[(cleanup: Fn) => void]>,
  ) => void,
) => {
  let getter: Fn
  if (isReactive(source)) {
    // 触发响应式
    getter = () => traversal(source)
  } else if (isFunction(source)) {
    getter = source
  } else {
    warn(
      `expect source is a function or reactive, but receive ${typeof source}`,
    )
    return
  }

  let oldValue

  let cleanup
  const onCleanUp = (fn: Fn) => {
    cleanup = fn
  }
  const job = () => {
    if (isFunction(cleanup)) cleanup()
    const newValue = effect.run()
    callback(newValue, oldValue, onCleanUp)
    oldValue = newValue
  }

  const effect = new ReactiveEffect(getter, job)
  oldValue = effect.run()
}
