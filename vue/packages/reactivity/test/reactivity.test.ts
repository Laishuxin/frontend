import { reactive } from '../src/reactivity'
import { expect, vi, it, describe, beforeEach } from 'vitest'
import { activeEffect, effect, ReactiveEffect } from '../src/effect'
import { computed } from '../src/computed'

const getInitValue = () => ({
  count: 1,
  flag: true,
  count2: 2,
  countObj: { count: 1 },
})
describe('Should perform the correct reactive', () => {
  let state = reactive(getInitValue())
  let gCount = 0
  beforeEach(() => {
    vi.useFakeTimers()
  })

  beforeEach(() => {
    state = reactive(getInitValue())
    gCount = 0
  })

  it('Should proxy once with the same target', () => {
    const target = { count: 1 }
    const proxy1 = reactive(target)
    const proxy2 = reactive(target)
    expect(proxy1 === proxy2).toBe(true)
  })

  it('Should return the same proxy when pass parameter is a proxy', () => {
    const proxy1 = reactive({ count: 1 })
    expect(proxy1 === reactive(proxy1)).toBeTruthy()
  })

  it('Reactive deep', () => {
    effect(() => {
      state.countObj.count++
      gCount++
    })
    expect(gCount).toBe(1)
    state.countObj.count++
    expect(gCount).toBe(2)
  })

  it('Should active current effect', () => {
    const effect = new ReactiveEffect(() => {
      expect(activeEffect).not.toBeNull()
    })
    effect.run()
    expect(activeEffect).toBeNull()
  })

  it('Should preserve the correct parent.', () => {
    effect(() => {
      // @ts-ignore
      // ID for activeEffect
      activeEffect.__TEST__ = '1'

      effect(() => {
        expect(activeEffect).not.toBeNull()
        // @ts-ignore
        expect(activeEffect.__TEST__).toBeUndefined()
      })

      // @ts-ignore
      expect(activeEffect.__TEST__).toBe('1')

      expect(activeEffect).not.toBeNull()

      // @ts-ignore
      expect(activeEffect.__TEST__).toBe('1')
    })
  })

  it('Should perform the correct dep collection', () => {
    effect(() => {
      gCount = state.count
    })
    expect(gCount).toBe(1)

    state.count++
    expect(gCount).toBe(2)
  })

  it('Should prevent recursive effect calling', () => {
    effect(() => {
      gCount++
      state.count++
    })
    expect(gCount).toBe(1)
  })

  it('Should avoid extra effect calling when encounter if branch', () => {
    effect(() => {
      gCount++
      if (state.flag) {
        state.count++
      } else {
        state.count2++
      }
    })

    expect(gCount).toBe(1)
    state.flag = false
    expect(gCount).toBe(2)
    state.count++
    // 此时：effect 只依赖了 count2，所以修改 count 不会触发 effect
    expect(gCount).toBe(2)
  })

  it('Should stop effect and restart effect', () => {
    const runner = effect(() => {
      state.count++
      gCount++
    })
    expect(gCount).toBe(1)

    runner.effect.stop()
    state.count++
    expect(gCount).toBe(1)
    runner()

    expect(gCount).toBe(2)
  })

  it("Enable to custom effect's scheduler", () => {
    let waiting = false
    const runner = effect(
      () => {
        state.count++
        gCount++
      },
      {
        scheduler: () => {
          if (!waiting) {
            waiting = true
            setTimeout(() => {
              runner()
              waiting = false
            }, 1000)
          }
        },
      },
    )
    expect(gCount).toBe(1)
    state.count++
    state.count++
    state.count++
    state.count++
    state.count++
    vi.advanceTimersToNextTimer()

    expect(gCount).toBe(2)
  })
})

describe('Test computed', () => {
  function getInitState() {
    return {
      firstName: 'first',
      lastName: 'last',
    }
  }

  let state = reactive(getInitState())
  let gCount = 0
  beforeEach(() => {
    state = reactive(getInitState())
    gCount = 0
  })

  it('Should perform computed correctly', () => {
    const computedName = computed(() => {
      gCount++
      return state.firstName + ' ' + state.lastName
    })

    expect(computedName.value).toBe(`first last`)
    expect(gCount).toBe(1)
    state.firstName = 'First'
    expect(computedName.value).toBe(`First last`)
    expect(gCount).toBe(2)
  })

  it('Should perform the correct getter and setter', () => {
    const computedName = computed({
      get: () => {
        gCount++
        return state.firstName + ' ' + state.lastName
      },
      set: lastName => {
        state.lastName = lastName
      },
    })

    expect(computedName.value).toBe(`first last`)
    computedName.value = 'Last'
    expect(computedName.value).toBe(`first Last`)
    expect(gCount).toBe(2)
  })
})
