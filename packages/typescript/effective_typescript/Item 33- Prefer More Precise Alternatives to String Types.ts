export {}

interface Data {
  name: string
  date: Date | string
  desc: string
}

const data: Data[] = [
  {
    name: '123',
    date: new Date().toString(),
    desc: '123',
  },
]

const pluck = <T, K extends keyof T>(records: T[], key: K): T[K][] => {
  return records.map(r => r[key])
}

const res1 = pluck(data, 'date')
const res2 = pluck(data, 'desc')
