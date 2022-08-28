// import { effect, reactive } from '../../../node_modules/@vue/reactivity'

// const state = reactive({
//   count: 1,
// })

// effect(() => {
//   box.innerHTML = state.count + ''
// })

// ======================
import { effect } from '../src/effect'
import { reactive } from '../src/reactivity'
const btn1 = document.getElementById('btn1') as HTMLButtonElement
const btn2 = document.getElementById('btn2') as HTMLButtonElement
const box = document.querySelector('.box')

const state = reactive({ count: 1 })

btn1.addEventListener('click', e => {
  state.count++
})

const obj = {
  name: '123',
  get alias() {
    return this.name
  },
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    console.log('get: ', key)
    return res
  },
})

console.log('alias: ', proxy.alias)

effect(() => {
  state.count++
  console.log('execute effect: ', state)
})

state.count++
