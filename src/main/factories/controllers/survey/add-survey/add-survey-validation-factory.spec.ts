import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'

jest.mock('../../../../../validation/validators/validator-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call makeAddSurveyValidation with all validations ', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
