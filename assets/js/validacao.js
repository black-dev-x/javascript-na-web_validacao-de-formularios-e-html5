const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo nome nao pode estar vazio'
  },
  email: {
    valueMissing: 'O campo de email nao pode estar vazio.',
    typeMismatch: 'O email digitado nao eh valido'
  },
  senha: {
    valueMissing: 'O campo de senha nao pode estar vazio.',
    patternMismatch: `A senha deve conter no minimo 6 caracteres, ao menos uma letra maiuscula, uma minuscula e um numero`
  },
  dataNascimento: {
    valueMissing: 'O campo de data de nascimento nao pode estar vazio.',
    customError: 'Voce deve ser maior que 18 anos para se cadastrar.'
  },
  cpf: {},
  cep: {},
  logradouro: {},
  cidade: {},
  estado: {}
}

const mostraMensagemDeErro = input => {
  const spanDeErro = input.parentElement.querySelector('span')
  const tipoDeInput = input.name
  const validacoesDoInput = input.validity
  try {
    for (tipoDeErro in validacoesDoInput) {
      const valor = validacoesDoInput[tipoDeErro]
      if (valor) {
        spanDeErro.innerHTML = mensagensDeErro[tipoDeInput][tipoDeErro]
      }
    }
  } catch (e) {
    console.log(e)
    console.log(`${tipoDeInput} ainda nao tratado`)
  }
}

const valida = input => {
  const tipoDeInput = input.dataset.tipo
  mostraMensagemDeErro(input)
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
  }
  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalido')
  } else {
    input.parentElement.classList.add('input-container--invalido')
  }
}

const validadores = {
  dataNascimento: input => validaDataNascimento(input)
}

const validaDataNascimento = input => {
  const data = new Date(input.value)
  input.setCustomValidity(maiorDeIdade(data) ? '' : 'Voce deve ser maior que 18 anos para se cadastrar')
}

const maiorDeIdade = data => {
  const dataAtual = new Date()
  const dataMais18 = new Date(data.getFullYear() + 18, data.getMonth(), data.getDate())
  console.log(dataMais18 < dataAtual)
  return dataMais18 < dataAtual
}

document.querySelectorAll('input').forEach(input => (input.onblur = e => valida(e.target)))
