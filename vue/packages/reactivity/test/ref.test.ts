import { it, describe, beforeEach, expect } from 'vitest'
import { effect } from '../src/effect'
import { ref } from '../src/ref'

function getInitState() {
  return
}

describe('Test ref', () => {
  let gCount = 1
  beforeEach(() => {
    gCount = 1
  })

  it('Should create the correct ref for primitive value', () => {
    const state = ref(1)
    expect(state.value).toBe(1)
    effect(() => {
      state.value++
      gCount++
    })
    expect(state.value).toBe(2)
    expect(gCount).toBe(2)
    state.value++
    expect(gCount).toBe(3)
    expect(state.value).toBe(3)
  })
})
