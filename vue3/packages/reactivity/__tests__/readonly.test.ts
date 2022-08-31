import { describe, expect, test } from 'vitest'
import { isReadonly, readonly, toRaw } from '../src/reactive'

describe('readonly', () => {
  test('object', () => {
    const original = { foo: 1 }
    const observed = readonly(original)
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
    const observed = readonly(original)
    expect(isReadonly(observed.nested)).toBeTruthy()
    expect(isReadonly(observed.nested)).toBeTruthy()
    expect(isReadonly(observed.array)).toBeTruthy()
    expect(isReadonly(observed.array.at(0))).toBeTruthy()
  })

  test('toRaw', () => {
    const original = { foo: 1 }
    const observed = readonly(original)
    expect(toRaw(original)).toBe(original)
    expect(toRaw(observed)).toBe(original)
  })
})
