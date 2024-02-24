class Drug {
  constructor(public name: string, public price: number) {}

  getInfo(): string {
    return `Назва: ${this.name}, Ціна: ${this.price}`
  }
}

abstract class DrugDecorator extends Drug {
  constructor(protected drug: Drug) {
    super(drug.name, drug.price)
  }

  abstract getInfo(): string
}

class ExpirationDateDecorator extends DrugDecorator {
  constructor(drug: Drug, public expirationDate: string) {
    super(drug)
  }

  getInfo(): string {
    return `${this.drug.getInfo()}. Термін придатності: ${this.expirationDate}`
  }
}

class ManufacturerDecorator extends DrugDecorator {
  constructor(drug: Drug, public manufacturer: string) {
    super(drug)
  }

  getInfo(): string {
    return `${this.drug.getInfo()}. Виробник: ${this.manufacturer}`
  }
}

class DosageDecorator extends DrugDecorator {
  constructor(drug: Drug, public dosage: string) {
    super(drug)
  }

  getInfo(): string {
    return `${this.drug.getInfo()}. Дозування: ${this.dosage}`
  }
}

function applyFeatures() {
  const name = document.getElementById('name') as HTMLInputElement
  const expiration = document.getElementById('expiration') as HTMLInputElement
  const dosage = document.getElementById('dosage') as HTMLInputElement
  const manufacturer = document.getElementById('manufacturer') as HTMLInputElement

  let drugWithFeatures = new Drug(name.value, 10)
  if (expiration.value) {
    drugWithFeatures = new ExpirationDateDecorator(drugWithFeatures, expiration.value)
  }
  if (dosage.value) {
    drugWithFeatures = new DosageDecorator(drugWithFeatures, dosage.value)
  }
  if (manufacturer.value) {
    drugWithFeatures = new ManufacturerDecorator(drugWithFeatures, manufacturer.value)
  }

  const drugDescription = document.getElementById('drugDescription')
  if (drugDescription) {
    drugDescription.innerText = drugWithFeatures.getInfo()
  }
}

document.getElementById('applyButton')?.addEventListener('click', applyFeatures)
