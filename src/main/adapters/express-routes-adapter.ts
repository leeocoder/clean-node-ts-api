import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): any => {
  return async (request: Request, response: Response): Promise<Response> => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (Number(httpResponse.statusCode) >= 200 && Number(httpResponse.statusCode) <= 299) {
      return response.status(Number(httpResponse.statusCode)).json(httpResponse.body)
    }
    return response.status(Number(httpResponse.statusCode)).json({ error: httpResponse.body.message })
  }
}
