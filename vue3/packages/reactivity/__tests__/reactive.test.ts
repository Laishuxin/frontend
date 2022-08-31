import { describe, expect, test } from 'vitest'
import {
  isReactive,
  reactive,
  readonly,
  shallowReadonly,
  toRaw,
} from '../src/reactive'

describe('reactive', () => {
  test('object', () => {
    const original = { foo: 1 }
    const observed = reactive(original)

    expect(observed).not.toBe(original)
    // 已经代理的。
    expect(reactive(original)).toBe(observed)
    expect(isReactive(observed)).toBeTruthy()
    expect(isReactive(original)).toBeFalsy()

    expect(original.foo).toBe(1)
    expect(observed.foo).toBe(1)
    expect(Object.keys(observed)).toEqual(Object.keys(original))
  })

  test('nested', () => {
    const original = {
      nested: { foo: 1 },
      array: [{ bar: 2 }],
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBeTruthy()
    expect(isReactive(observed.nested)).toBeTruthy()
    expect(isReactive(observed.array)).toBeTruthy()
    expect(isReactive(observed.array.at(0))).toBeTruthy()
  })

  test('toRaw', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(toRaw(original)).toBe(original)
    expect(toRaw(observed)).toBe(original)
  })
})
