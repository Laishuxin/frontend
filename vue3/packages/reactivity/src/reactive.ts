import { isObject } from '@vue3/shared'
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandlers'
import { warn } from './warn'

export const ReactiveFlags = {
  IS_REACTIVE: '__is_reactive',
  IS_READONLY: '__is_readonly',
  IS_RAW: '__is_raw',
} as const

export const readonlyMap = new WeakMap()
export const reactiveMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()

export const reactive = <T extends object>(target: T): T => {
  return createReactiveObject(target, reactiveMap, mutableHandlers)
}
export const readonly = <T extends object>(target: T): T => {
  return createReactiveObject(target, readonlyMap, readonlyHandlers)
}

export const shallowReadonly = <T extends object>(target: T): T => {
  return createReactiveObject(
    target,
    shallowReadonlyMap,
    shallowReadonlyHandlers,
  )
}

function createReactiveObject(target, map: WeakMap<any, unknown>, handler) {
  if (!isObject(target)) {
    warn(`expect source is an Object, but receive ${typeof target}`)
    return target
  }
  const existingProxy = map.get(target)
  if (existingProxy) return existingProxy

  const proxy = new Proxy(target, handler)
  map.set(target, proxy)

  return proxy
}

export function isReactive(target) {
  return !!target[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(target) {
  return !!target[ReactiveFlags.IS_READONLY]
}

export function isProxy(target) {
  return isReactive(target) || isReadonly(target)
}

export function toRaw(target) {
  return target[ReactiveFlags.IS_RAW] || target
}
