import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldsValidation implements Validation {
  private readonly filedName: string
  constructor (fieldName: string) {
    this.filedName = fieldName
  }

  validate (input: any): Error | null {
    if (!input[this.filedName]) return new MissingParamError(this.filedName)
    return null
  }
}
