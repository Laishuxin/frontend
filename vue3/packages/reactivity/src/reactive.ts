import { isObject } from '@vue3/shared'
import { warn } from './warn'

export const reactive = (obj: unknown) => {
  if (!isObject(obj)) {
    warn(`expect source is an Object, but receive ${typeof obj}`)
    return obj
  }
}
