import { FLAG, trigger } from './effect'
import { reactiveMap, readonlyMap, shallowReadonlyMap } from './reactive'
import { warn } from './warn'

const createGetter = (isReadonly = false, isShallow = false) => {
  return function get() {}
}
const createSetter = (isReadonly = false) => {
  if (isReadonly) {
    return function set(target, key) {
      warn(`Set operation on key "${String(key)}" failed, target is readonly`)
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
