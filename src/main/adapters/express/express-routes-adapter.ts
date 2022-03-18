import { Controller, HttpRequest } from '../../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): any => {
  return async (request: Request, response: Response): Promise<Response> => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpRequest === 500) return response.status(Number(httpResponse.statusCode)).json({ error: httpResponse.body.message })
    console.log(httpResponse)
    return response.status(Number(httpResponse.statusCode)).json(httpResponse.body)
  }
}
