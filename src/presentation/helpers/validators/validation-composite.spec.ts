import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validator-composite'

interface sutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): sutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return { sut, validationStub }
}

describe('ValidationComposite', () => {
  test('Should return an erro any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
