import { badRequest } from '../../../helpers/http/http-helper'
import { Validation } from './../../../protocols/validation'
import { HttpRequest, HttpResponse, Controller } from './add-survey-controller-protocols'
export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(new Error())
    return {
      statusCode: 200,
      body: {}
    }
  }
}
