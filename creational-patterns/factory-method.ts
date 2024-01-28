// Use cases:
// When you need to create a lot of similar objects with the same structure but different data
// When you need common interface for multiple implementations

/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */

abstract class OS {
  public abstract greetUser(): void
  /**
    * Also note that, despite its name, the Creator's primary responsibility is
    * not creating products. Usually, it contains some core business logic that
    * relies on Product objects, returned by the factory method. Subclasses can
    * indirectly change that business logic by overriding the factory method
    * and returning a different type of product from it.
    */
  public getInfo(): string {
    const information = "It's OS"
    return information
  }
}

// Concrete Creators override the factory method in order to change the resulting product's type.

class Windows implements OS {
  public greetUser(): void {
    const messager = new WindowsMessage()
    messager.render('Windows is cool')
  }
  public getInfo(): string {
    const information = "It's Windows"
    return information
  }
}

class Linux implements OS {
  public greetUser(): void {
    const messager = new LinuxMessage()
    messager.render('Linux is lit')
  }
  public getInfo(): string {
    const information = "It's Linux"
    return information
  }
}


// The Product interface declares the operations that all concrete products must implement

interface Message {
  render(text: string): void
  onClick(callback: void): void
  onClose(callback: void): void
}

// Concrete Products provide various implementations of the Product interface

class WindowsMessage implements Message {
  render(text: string): void {
    console.log(`Windows Notification: ${text}`)
  }
  onClick(callback: any): void {
    callback()
  }
  onClose(callback: any): void {
    callback()
  }
}

class LinuxMessage implements Message {
  render(text: string): void {
    console.log(`Linux Notification: ${text}`)
  }
  onClick(callback: any): void {
    callback()
  }
  onClose(callback: any): void {
    callback()
  }
}

const windows = new Windows()
const linux = new Linux()

// Thit function might be unchangable
const clientCode = (os: OS) => {
  os.greetUser()
  console.log(os.getInfo())
}

// That way, we can easily change the logic by changing only one argument

clientCode(windows)
// Windows Notification: Windows is cool
// It's Windows
clientCode(linux)
// Linux Notification: Linux is lit
// It's Linux