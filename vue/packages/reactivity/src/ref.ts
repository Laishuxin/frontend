import { isArray, isObject } from 'lodash-es'
import { trackEffects, triggerEffects } from './effect'
import { reactive } from './reactivity'
import { REACTIVE_FLAGS } from './_flags'

function toReactive(value: any) {
  return isObject(value) ? reactive(value) : value
}

class RefImpl {
  [REACTIVE_FLAGS.IS_REF] = true

  public dep = new Set()
  private _value: any

  constructor(private rawValue: any) {
    this._value = toReactive(rawValue)
  }

  get value() {
    trackEffects(this.dep)
    return this._value
  }

  set value(newVal) {
    if (this.rawValue !== newVal) {
      triggerEffects(this.dep)
      this.rawValue = toReactive(newVal)
      this._value = newVal
    }
  }
}

export const ref = <T>(v: T): { value: T } => {
  return new RefImpl(v)
}

class ObjectImpl {
  constructor(public object, public key) {}

  get value() {
    return this.object[this.key]
  }
  set value(newValue) {
    this.object[this.key] = newValue
  }
}
export function toRef(object, key) {
  return new ObjectImpl(object, key)
}

export function toRefs(reactiveObject) {
  const res = isArray(reactiveObject) ? [] : {}
  for (const key in reactiveObject) {
    res[key] = toRef(reactiveObject, key)
  }

  return res
}

export function proxyRefs(object) {
  return new Proxy(object, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      if (res && res[REACTIVE_FLAGS.IS_REACTIVE]) return res.value
      return res
    },

    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key)

      if (oldValue && oldValue[REACTIVE_FLAGS.IS_REF]) {
        oldValue.value = value
        return true
      }

      return Reflect.set(target, key, value, receiver)
    },
  })
}
