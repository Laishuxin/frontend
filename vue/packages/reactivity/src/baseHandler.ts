import { track, trigger } from './effect'

export const enum REACTIVE_FLAGS {
  IS_REACTIVE = '__v_is_reactive',
}

export const baseHandler = {
  get(target, key, receiver) {
    if (key === REACTIVE_FLAGS.IS_REACTIVE) return true
    const res = Reflect.get(target, key, receiver)
    track(target, 'get', key)
    return res
  },
  set(target, key, value, receiver) {
    const oldValue = Reflect.get(target, key, receiver)
    const result = Reflect.set(target, key, value, receiver)
    if (oldValue !== value) {
      trigger(target, 'set', key, value, oldValue)
    }
    return result
  },
}
