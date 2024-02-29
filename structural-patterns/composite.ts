// Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.

// Use:
// When you have to implement a tree-like object structure
// When you want the client code to treat both simple and complex elements uniformly.

interface RoofParams {
  width: number
  length: number
}

interface RoofComponent {
  calculateMaterials(roofParams: RoofParams): number
}

class RoofTypeComponent implements RoofComponent {
  private children: RoofComponent[]

  constructor() {
    this.children = []
  }

  add(component: RoofComponent): void {
    this.children.push(component)
  }

  calculateMaterials(roofParams: RoofParams): number {
    let totalMaterials = 0
    for (const child of this.children) {
      totalMaterials += child.calculateMaterials(roofParams)
    }
    return totalMaterials
  }
}

class MaterialComponent implements RoofComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return 0
  }
}

// Типу даху
class SingleSlopeRoofComponent implements RoofComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 10
  }
}

class DoubleSlopeRoofComponent implements RoofComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 8
  }
}

class FourSlopeRoofComponent implements RoofComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 6
  }
}

// Види покрівлі даху
class RollMaterialComponent implements MaterialComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 10
  }
}

class TileMaterialComponent implements MaterialComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 5
  }
}

class SheetMaterialComponent implements MaterialComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 15
  }
}

class FilmMaterialComponent implements MaterialComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 3
  }
}

class MasticMaterialComponent implements MaterialComponent {
  calculateMaterials(roofParams: RoofParams): number {
    return (roofParams.width * roofParams.length) / 7
  }
}

function calculateMaterialsForRoofType(
  selectedRoofType: string,
  selectedMaterialType: string,
  roofParams: RoofParams
): number {
  let totalMaterialsNeeded = 0
  let roof = new RoofTypeComponent()

  roof = choseRoof(roof, selectedRoofType)
  roof = choseMaterial(roof, selectedMaterialType)

  totalMaterialsNeeded = roof.calculateMaterials(roofParams)
  return totalMaterialsNeeded
}

function choseMaterial(roof: RoofTypeComponent, selectedMaterialType: string) {
  switch (selectedMaterialType) {
    case 'roll':
      roof.add(new RollMaterialComponent())
      break
    case 'tile':
      roof.add(new TileMaterialComponent())
      break
    case 'sheet':
      roof.add(new SheetMaterialComponent())
      break
    case 'film':
      roof.add(new FilmMaterialComponent())
      break
    case 'mastic':
      roof.add(new MasticMaterialComponent())
      break
  }
  return roof
}

function choseRoof(roof: RoofTypeComponent, selectedRoofType: string) {
  switch (selectedRoofType) {
    case 'single-slope':
      roof.add(new SingleSlopeRoofComponent())
      break
    case 'double-slope':
      roof.add(new DoubleSlopeRoofComponent())
      break
    case 'four-slope':
      roof.add(new FourSlopeRoofComponent())
      break
  }
  return roof
}

document.addEventListener('DOMContentLoaded', function () {
  const calculateButton = document.getElementById('calculate-btn')
  calculateButton?.addEventListener('click', function () {
    const roofTypeSelect = document.getElementById('roof-type') as HTMLSelectElement
    const materialTypeSelect = document.getElementById('material-type') as HTMLSelectElement
    const widthInput = document.getElementById('width') as HTMLInputElement
    const lengthInput = document.getElementById('length') as HTMLInputElement
    const resultDiv = document.getElementById('result') as HTMLDivElement

    const roofParams = {
      width: parseFloat(widthInput.value),
      length: parseFloat(lengthInput.value),
    }

    const selectedRoofType = roofTypeSelect.value
    const selectedMaterialType = materialTypeSelect.value

    const totalMaterialsNeeded = calculateMaterialsForRoofType(
      selectedRoofType,
      selectedMaterialType,
      roofParams
    )

    resultDiv.textContent = `Необхідно матеріалів: ${totalMaterialsNeeded} одиниць`
  })
})
