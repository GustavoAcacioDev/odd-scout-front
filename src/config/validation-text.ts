export const validationText = {
  zod: {
    requiredError: 'Esse campo é obrigatório',
    requiredNumber: 'O valor deve ser maior que 0',
    requiredOption: 'Por favor, selecione uma opção.',
    invalidDate: 'Data inválida',
    invalidTime: 'Horário inválido',
    invalidEmail: 'E-mail inválido',
    invalidUrl: 'URL inválida',
    invalidCNPJ: 'CNPJ inválido',
    maxCharacters: (max: number) =>
      `O campo pode ter no máximo ${max} caracteres`,
    maxNumber: (max: number) => `O campo pode ter no máximo ${max}.`,
    minValue: (min: number) => `O valor deve ser maior ou igual a ${min}.`,
    maxValue: (max: number) => `O valor deve ser menor ou igual a ${max}.`,
  },
}
