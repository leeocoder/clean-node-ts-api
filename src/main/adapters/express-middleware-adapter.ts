import { HttpRequest, Middleware } from '../../presentation/protocols'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware): any => {
  return async (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> => {
    const httpRequest: HttpRequest = {
      headers: request.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (Number(httpResponse.statusCode) === 200) {
      Object.assign(request, httpResponse.body)
      next()
    } else {
      return response.status(Number(httpResponse.statusCode)).json({ error: httpResponse.body.message })
    }
  }
}
