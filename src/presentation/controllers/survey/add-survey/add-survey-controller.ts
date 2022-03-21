import { Validation } from './../../../protocols/validation'
import { HttpRequest, HttpResponse, Controller } from './add-survey-controller-protocols'
export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return {
      statusCode: 200,
      body: {}
    }
  }
}
