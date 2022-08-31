import { describe, expect, test } from 'vitest'
import { isReadonly, shallowReadonly, toRaw } from '../src/reactive'

describe('readonly', () => {
  test('object', () => {
    const original = { foo: 1 }
    const observed = shallowReadonly(original)
    expect(isReadonly(original)).toBeFalsy()
    expect(isReadonly(observed)).not.toBeFalsy()
    expect(observed.foo).toBe(1)
    observed.foo = 2
    expect(observed.foo).toBe(1)
  })

  test('nested', () => {
    const original = {
      nested: { foo: 1 },
      array: [{ bar: 2 }],
    }
    const observed = shallowReadonly(original)
    expect(isReadonly(observed.nested)).toBeFalsy()
    expect(isReadonly(observed.array)).toBeFalsy()
    expect(isReadonly(observed.array.at(0))).toBeFalsy()

    expect(observed.nested.foo).toBe(1)
    observed.nested.foo = 2
    expect(observed.nested.foo).toBe(2)
  })

  test('toRaw', () => {
    const original = { foo: 1 }
    const observed = shallowReadonly(original)
    expect(toRaw(original)).toBe(original)
    expect(toRaw(observed)).toBe(original)
  })
})
