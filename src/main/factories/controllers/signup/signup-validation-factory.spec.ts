import {
  CompareFieldsValidation,
  EmailValidation,
  ValidationComposite,
  RequiredFieldsValidation
} from '../../../../presentation/helpers/validators'

import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidator } from '../../../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation-factory'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'confirmPassword']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
