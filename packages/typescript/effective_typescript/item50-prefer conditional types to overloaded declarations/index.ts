export {}
// conditional types
{
  function double(input: number): number
  function double(input: string): string
  function double(input: number | string): number | string
  function double(input: any) {
    return input + input
  }

  double(1)
  double('x')

  function invoker(input: string | number) {
    return double(input)
  }
  invoker(1)
}

{
  function double<T extends number | string>(
    input: T,
  ): T extends string ? string : number
  function double(input: any) {
    return input + input
  }

  double(1)
  double('1')

  function invoker(input: string | number) {
    return double(input)
  }

  invoker(1)
}
