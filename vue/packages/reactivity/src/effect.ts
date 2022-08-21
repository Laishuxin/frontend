import { Fn } from './types'

function cleanEffect(effect: ReactiveEffect) {
  const { deps } = effect
  deps.forEach(item => item.delete(effect))
}

export let activeEffect: ReactiveEffect | null = null
export class ReactiveEffect {
  // 是否为激活状态：可以执行依赖收集
  public active = true
  // 多对多的关系
  public deps: any[] = []
  public parent: ReactiveEffect | null = null

  constructor(public fn: Fn, public scheduler?: Function) {}

  run() {
    if (!this.active) {
      return this.fn()
    }

    this.parent = activeEffect
    activeEffect = this

    try {
      cleanEffect(this)
      return this.fn()
    } finally {
      activeEffect = this.parent
      this.parent = null
    }
  }

  stop() {
    if (this.active) {
      this.active = false
      cleanEffect(this)
    }
  }
}

export function effect(fn: Fn, options: { scheduler?: Function } = {}) {
  // 可以嵌套
  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()

  const runner = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
}

const targetMap = new WeakMap<any, Map<any, Set<any>>>()

export function trackEffects(dep: Set<any>) {
  if (!activeEffect) return

  const shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function track(target, type, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)!
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  trackEffects(dep)
}

export function triggerEffects(effects: Set<any>) {
  const clonedEffects = new Set(effects)
  clonedEffects.forEach(effect => {
    if (activeEffect !== effect) {
      effect.scheduler ? effect.scheduler() : effect.run()
    }
  })
}

export function trigger(target, type, key, newValue, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  if (effects) triggerEffects(effects)
}
