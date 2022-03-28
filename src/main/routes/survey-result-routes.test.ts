import { app } from '../config/app'
import env from '../config/env'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import mockDate from 'mockdate'
import { Collection } from 'mongodb'
import request from 'supertest'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const accountId = await accountCollection.insertOne({ name: 'Leonardo Albuquerque', email: 'ricalb@mail.com', password: '123' })
  const account = await accountCollection.findOne({ _id: accountId.insertedId })
  const accessToken = sign({ id: account?._id }, env.jwtSecret)
  await accountCollection.updateOne({ _id: accountId.insertedId }, { $set: { accessToken } })

  return await Promise.resolve(accessToken)
}

const mockSurveyModel = (): AddSurveyParams => {
  const survey: AddSurveyParams = {
    question: 'any_question',
    answers: [{
      image: 'http://imagem.com/this-is-a-image.png',
      answer: 'any_answer'
    },
    {
      image: 'http://imagem.com/this-is-a-image.png',
      answer: 'other_answer'
    }],
    created_at: new Date()
  }

  return survey
}
const makeInsertSurvey = async (): Promise<any> => {
  const insertedSurvey = await surveyCollection.insertOne(mockSurveyModel())
  const survey = await surveyCollection.findOne({ _id: insertedSurvey.insertedId })
  return survey
}

describe('Survey Router', () => {
  beforeAll(async () => {
    mockDate.set(new Date())
    return await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    mockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const survey = await makeInsertSurvey()
      await request(app)
        .put(`/api/surveys/${String(survey?._id)}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'any_answer' })
        .expect(200)
    })
  })
})

request(app)
