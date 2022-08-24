import { IsEqual } from '../../types-utils'
export {}

type A = 'A' | 'a'
type B = 'B' | 'b'
type AIntersectionB = A & B // never
type AUnionB = A | B // 'a' | 'b' | 'A' | 'B'

interface IA {
  A: 'A'
  a: 'a'
}

interface IB {
  B: 'B'
  b: 'b'
}

type IAIntersectionIB = IA & IB // { A: 'A', B:'B', a: 'a', b: 'b' }
type KeyofIAIntersectionIB = keyof (IA & IB)
type KeyofIAUnionIB = keyof (IA | IB)
let ans1: IsEqual<KeyofIAIntersectionIB, A | B>
let ans2: IsEqual<KeyofIAUnionIB, A & B>
// let iAIntersectionIB: IAIntersectionIB = {}
