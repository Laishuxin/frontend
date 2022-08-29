export {
  isObject,
  isArray,
  isNumber,
  isFunction,
  isString,
  camelCase,
  capitalize,
  extend,
  noop,
} from 'lodash-es'

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = (str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()

export const hasOwn = (val: unknown, key: string) =>
  Object.prototype.hasOwnProperty.call(val, key)
