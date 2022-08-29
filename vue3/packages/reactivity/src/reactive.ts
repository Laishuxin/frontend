import { isObject } from '@vue3/shared'
import { warn } from './warn'

export const ReactiveFlags = {
  IS_REACTIVE: '__is_reactive',
  IS_READONLY: '__is_readonly',
  IS_RAW: '__is_raw',
} as const

export const readonlyMap = new WeakMap()
export const reactiveMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()

export const reactive = (obj: unknown) => {
  if (!isObject(obj)) {
    warn(`expect source is an Object, but receive ${typeof obj}`)
    return obj
  }
}
