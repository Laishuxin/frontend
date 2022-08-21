import { isObject } from 'lodash-es'
import { baseHandler } from './baseHandler'
import { REACTIVE_FLAGS } from './_flags'

const reactiveMap = new WeakMap()
export function reactive<T>(target: T): T {
  if (!isObject(target)) {
    return target
  }

  const existingProxy = reactiveMap.get(target)
  // console.log('existingProxy: ', existingProxy)
  if (existingProxy) {
    return existingProxy
  }
  if (target[REACTIVE_FLAGS.IS_REACTIVE]) {
    return target
  }

  const proxy = new Proxy(target, baseHandler)
  reactiveMap.set(target, proxy)
  return proxy
}
