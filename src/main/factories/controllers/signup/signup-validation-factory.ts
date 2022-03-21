import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite
} from '../../../../presentation/helpers/validators'

import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'confirmPassword']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
