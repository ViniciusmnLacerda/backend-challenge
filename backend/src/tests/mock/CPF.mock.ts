const CPFs = [
  {
    cpf: "92238233318",
    createdAt: "2023-02-09T15:42:25.000Z"
  },
  {
    cpf: "08051342127",
    createdAt: "2023-02-09T15:42:30.000Z"
  },
  {
    cpf: "36806723810",
    createdAt: "2023-02-09T15:42:35.000Z"
  }
]

const CPFInUse = "92238233318"
const unsedCPF = "25479514792"

const CPFInUseInput = {
  cpf: "92238233318",
}

const CPFWithDot = {
  cpf: "922.382.333-18"
}

const newCPF = {
  cpf: "25479514792"
}

const CPFWrongLength = {
  cpf: "922382318"
}

const CPFWrongDigit = {
  cpf: "92238233398"
}

const CPFEqualDigits = {
  cpf: "11111111111"
}

const CPFInput = {
  cpf: "25479514792",
}
export {
  CPFs,
  CPFInUse,
  unsedCPF,
  newCPF,
  CPFInUseInput,
  CPFWithDot,
  CPFWrongLength,
  CPFWrongDigit,
  CPFEqualDigits,
  CPFInput,
}

