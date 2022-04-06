export {}
function lemonadeChange(bills: number[]): boolean {
  const packets = [0, 0, 0]
  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]
    if (bill === 5) {
      packets[0]++
      continue
    }

    if (bill === 10) {
      if (!packets[0]) return false
      packets[0]--
      packets[1]++
      continue
    }

    if (packets[1]) {
      if (!packets[0]) return false

      packets[0]--
      packets[1]--
      packets[2]++
    } else {
      if (packets[0] < 3) return false
      packets[0] -= 3
      packets[2]++
    }
  }

  return true
}
