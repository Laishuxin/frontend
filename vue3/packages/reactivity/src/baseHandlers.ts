import { isObject } from '@vue3/shared'
import { FLAG, track, trigger } from './effect'
import {
  reactive,
  ReactiveFlags,
  reactiveMap,
  readonly,
  readonlyMap,
  shallowReadonlyMap,
} from './reactive'
import { warn } from './warn'

const createGetter = (isReadonly = false, isShallow = false) => {
  return function get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_RAW) {
      if (
        reactiveMap.get(target) === receiver ||
        readonlyMap.get(target) === receiver ||
        shallowReadonlyMap.get(target) === receiver
      ) {
        return target
      }
    }

    const res = Reflect.get(target, key, receiver)
    if (!isReadonly) track(target, FLAG.GET, key)
    if (isShallow) return res

    if (isObject(res)) return isReadonly ? readonly(res) : reactive(res)
    return res
  }
}
const createSetter = (isReadonly = false) => {
  if (isReadonly) {
    return function set(target, key) {
      warn(`Set operation on key "${String(key)}" failed, target is readonly`)
      return true
    }
  } else {
    return function set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, FLAG.SET, key)
      return res
    }
  }
}

const get = createGetter()
const set = createSetter()
const readonlySet = createSetter(true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

export const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
  set: readonlySet,
}

export const readonlyHandlers = {
  get: readonlyGet,
  set: readonlySet,
}

export const mutableHandlers = {
  get,
  set,
}

// const obj = { name: '1' }
// const obj2 = Object.assign({ age: '2' }, obj)
// const p = new Proxy(obj, {
//   get(target, key, receiver) {
//     console.log('target1: ', target)
//     console.log('receiver1: ', receiver)
//     return Reflect.get(target, key, receiver)
//   },
// })

// const p2 = new Proxy(obj2, {
//   get(target, key, receiver) {
//     console.log('target2: ', target)
//     console.log('receiver2: ', receiver)
//     return Reflect.get(target, key, receiver)
//   },
// })

// p.name
// p2.name
