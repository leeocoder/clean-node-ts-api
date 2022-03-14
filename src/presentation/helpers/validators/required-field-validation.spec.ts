import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
