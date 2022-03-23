import { AddSurveyModel } from './../../domain/usecases/add-survey'
import { app } from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Router', () => {
  beforeAll(async () => {
    return await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      const survey: AddSurveyModel = {
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'http://imagem.com/this-is-a-image.png'
        }]
      }
      await request(app)
        .post('/api/surveys')
        .send(survey)
        .expect(403)
    })
    test('Should return 403 on add survey with valid token', async () => {
      const accountId = await accountCollection.insertOne({ name: 'Leonardo Albuquerque', email: 'ricalb@mail.com', password: '123', role: 'admin' })
      const account = await accountCollection.findOne({ _id: accountId.insertedId })
      const accessToken = sign({ id: account?._id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: accountId.insertedId }, { $set: { accessToken } })
      const survey: AddSurveyModel = {
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'http://imagem.com/this-is-a-image.png'
        }]
      }
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(survey)
        .expect(204)
    })
  })
})

request(app)
