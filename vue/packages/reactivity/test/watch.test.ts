import { vi, describe, expect, it, beforeEach, MockedFunction } from 'vitest'
// import { nextTick } from 'vue'
import { reactive } from '../src/reactivity'
import { watch } from '../src/watch'
import { delay } from './_utils'

describe('Test watch', () => {
  function getInitState() {
    return {
      count: 1,
    }
  }

  let state = reactive(getInitState())
  let gCount = 0
  let gOldValue: any
  let gNewValue: any
  vi.useFakeTimers()
  beforeEach(() => {
    state = reactive(getInitState())
    gCount = 0
    gOldValue = undefined
    gNewValue = undefined
  })

  it('Should perform the correct watch function when passing a getter function', () => {
    watch(
      () => state.count,
      (_newValue, _oldValue) => {
        gNewValue = _newValue
        gOldValue = _oldValue
      },
    )

    state.count++
    expect(gOldValue).toBe(1)
    expect(gNewValue).toBe(2)
  })

  it('Should perform the correct watch function when passing a reactive object', () => {
    watch(state, (_newValue, _oldValue) => {
      // console.log('newValue: ', _newValue)
      gNewValue = _newValue
      gOldValue = _oldValue
    })

    state.count++
    expect(gNewValue).toBeDefined()
    expect(gOldValue).toBeDefined()
    expect(gNewValue).toEqual(gOldValue)
    expect(gNewValue.count).toBe(2)
    expect(gOldValue.count).toBe(2)
  })

  it.todo('Should perform the correct cleanup function', async () => {
    const cleanup = vi.fn()
    watch(
      () => state.count,
      (newVal, oldVal, onCleanUp) => {
        onCleanUp(cleanup)
      },
    )

    state.count++
    // await nextTick()
    expect(cleanup).toHaveBeenCalledTimes(1)
  })
})
