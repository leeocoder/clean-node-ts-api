import { app } from '../config/app'
import request from 'supertest'

describe('CORS Middleware', () => {
  app.get('/test_cors', (request, response) => {
    return response.send()
  })
  test('Should enable cors', async () => {
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})

request(app)
