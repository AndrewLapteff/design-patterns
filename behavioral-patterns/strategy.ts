/** Strategy is a behavioral design pattern that lets you define a family of algorithms,
 *  put each of them into a separate class, and make their objects interchangeable. */

// Use:
/** When you want to use different variants of an algorithm within an object and be able to switch from one
 *  algorithm to another during runtime.  */
//  When you have a lot of similar classes that only differ in the way they execute some behavior

interface Strategy {
  execute: (first: number, second: number) => number
}

class AddStrategy implements Strategy {
  execute = (first: number, second: number): number => {
    return first + second
  }
}

class SubstractStrategy implements Strategy {
  execute = (first: number, second: number): number => {
    return first - second
  }
}

class MultiplyStrategy implements Strategy {
  execute = (first: number, second: number): number => {
    return first * second
  }
}

class DivideStrategy implements Strategy {
  execute = (first: number, second: number): number => {
    return first / second
  }
}

class Context {
  private strategy: Strategy

  constructor(strategy: Strategy) {
    this.strategy = strategy
  }

  public calculate(first: number, second: number) {
    return this.strategy.execute(first, second)
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy
  }
}

function main() {
  const context = new Context(new AddStrategy())
  console.log(context.calculate(2, 2)) // 4

  context.setStrategy(new SubstractStrategy())
  console.log(context.calculate(4, 2)) // 2

  context.setStrategy(new MultiplyStrategy())
  console.log(context.calculate(3, 2)) // 6

  context.setStrategy(new DivideStrategy())
  console.log(context.calculate(4, 1)) // 4
}

main()
