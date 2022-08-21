export function delay(time = 200) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
