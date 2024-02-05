/** Abstract Factory is a creational design pattern that lets you produce families of related objects without
 *  specifying their concrete classes */

// Use:
// When your code needs to work with various families of related products, but you don’t want it to depend on the concrete classes of those products—they might be unknown beforehand or you simply want to allow for future extensibility.
// When you want to make sure that products you’re getting from a factory are compatible with each other.

interface GUIFactory {
  createButton(): HTMLButtonElement
  createCheckbox(): HTMLInputElement
}

interface Button {
  render(): HTMLButtonElement
}

interface Checkbox {
  render(): HTMLInputElement
}

class WindowsButton implements Button {
  render(): HTMLButtonElement {
    const button = document.createElement('button')
    return button
  }
}

class MacOSButton implements Button {
  render(): HTMLButtonElement {
    const button = document.createElement('button')
    return button
  }
}

class WindowsCheckbox implements Checkbox {
  render(): HTMLInputElement {
    const input = document.createElement('input')
    return input
  }
}

class MacOSCheckbox implements Checkbox {
  render(): HTMLInputElement {
    const input = document.createElement('input')
    return input
  }
}

class WindowsGUIFactory implements GUIFactory {
  private button = new WindowsButton()
  private checkbox = new WindowsCheckbox()
  createButton(): HTMLButtonElement {
    return this.button.render()
  }
  createCheckbox(): HTMLInputElement {
    return this.checkbox.render()
  }
}

class MacOSGUIFactory implements GUIFactory {
  private button = new MacOSButton()
  private checkbox = new MacOSCheckbox()
  createButton(): HTMLButtonElement {
    return this.button.render()
  }
  createCheckbox(): HTMLInputElement {
    return this.checkbox.render()
  }
}

const program = (gui: GUIFactory) => { }

const macos = new MacOSGUIFactory()
const windowz = new WindowsGUIFactory()

program(macos)
program(windowz)