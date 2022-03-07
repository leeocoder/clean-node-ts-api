import { app } from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Should return an account on success', () => {
  beforeAll(async () => {
    return await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('Should enable cors', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Leonardo Albuquerque', email: 'leeodesign@hotmail.com', password: '123456', confirmPassword: '123456' })
      .expect(200)
  })
})

request(app)
