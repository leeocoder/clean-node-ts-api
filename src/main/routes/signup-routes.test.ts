import { app } from '../config/app'
import request from 'supertest'

describe('Should return an account on success', () => {
  test('Should enable cors', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Leonardo Albuquerque', email: 'leeodesign@hotmail.com', password: '123456', confirmPassword: '123456' })
      .expect(200)
  })
})

request(app)
