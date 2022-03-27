import { app } from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import mockDate from 'mockdate'
import request from 'supertest'

describe('Survey Router', () => {
  beforeAll(async () => {
    mockDate.set(new Date())
    return await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    mockDate.reset()
    await MongoHelper.disconnect()
  })
  describe('POST /surveys', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/:any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})

request(app)
