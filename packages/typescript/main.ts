import './effective_typescript'

interface User {
  name: string
}

class Demo {
  constructor(private user: User) {}
  static async init() {
    return new Demo({ name: 'demo' })
  }

  getUserName() {
    return this.user.name
  }
}

async function main() {
  const user = await Demo.init()
  console.log('name: ', user.getUserName())
}

main()
