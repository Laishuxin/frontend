import { describe, test } from 'vitest'
import { reactive } from '../src/reactive'

describe('reactive', () => {
  test('should pass object only', () => {
    reactive({})
  })
})
