import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validator-composite'

describe('ValidationComposite', () => {
  test('Should return an erro any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
