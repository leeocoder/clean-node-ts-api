import { app } from '@/main/config/app'
import request from 'supertest'

describe('Body Parser Middlewares', () => {
  app.post('/test_body_parser', (request, response) => {
    return response.send(request.body)
  })
  test('Should parse body as json', async () => {
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Leonardo' })
      .expect({ name: 'Leonardo' })
  })
})

request(app)
