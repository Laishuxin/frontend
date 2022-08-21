import { isFunction, isObject } from 'lodash-es'
import {
  ReactiveEffect,
  track,
  trackEffects,
  trigger,
  triggerEffects,
} from './effect'
import { Fn } from './types'
import { REACTIVE_FLAGS } from './_flags'

type ComputedOption = {
  get: Fn
  set: Fn
}
class ComputedRefImpl {
  [REACTIVE_FLAGS.IS_READONLY] = true;

  [REACTIVE_FLAGS.IS_REF] = true
  _value: any
  _dirty = true
  effect: ReactiveEffect
  dep = new Set()

  constructor(public getter: Fn, public setting: Fn) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        triggerEffects(this.dep)
        this._dirty = true
      }
    })
  }

  get value() {
    if (this._dirty) {
      trackEffects(this.dep)
      this._dirty = false
      this._value = this.effect.run()
    }

    return this._value
  }

  set value(newValue) {
    this.setting(newValue)
  }
}

export const computed = (getterOrOptions: Fn | ComputedOption) => {
  let getter: Fn
  let setter: Fn
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = () => {}
  } else {
    getter = (getterOrOptions as ComputedOption).get
    setter = (getterOrOptions as ComputedOption).set
  }
  return new ComputedRefImpl(getter, setter)
}
