import { AddSurveyModel } from './../../domain/usecases/add-survey'
import { app } from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection

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
  })
  describe('POST /surveys', () => {
    test('Should return 204 on add survey success', async () => {
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
        .expect(204)
    })
  })
})

request(app)
