import { AddSurveyModel } from './../../domain/usecases/add-survey'
import { app } from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import mockDate from 'mockdate'

let surveyCollection: Collection
let accountCollection: Collection

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
    test('Should return 403 on add survey without accessToken', async () => {
      const survey: AddSurveyModel = {
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'http://imagem.com/this-is-a-image.png'
        }],
        created_at: new Date()
      }
      await request(app)
        .post('/api/surveys')
        .send(survey)
        .expect(403)
    })
    test('Should return 204 on add survey with valid token', async () => {
      const accountId = await accountCollection.insertOne({ name: 'Leonardo Albuquerque', email: 'ricalb@mail.com', password: '123', role: 'admin' })
      const account = await accountCollection.findOne({ _id: accountId.insertedId })
      const accessToken = sign({ id: account?._id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: accountId.insertedId }, { $set: { accessToken } })
      const survey: AddSurveyModel = {
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'http://imagem.com/this-is-a-image.png'
        }],
        created_at: new Date()
      }
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(survey)
        .expect(204)
    })
  })
  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
    test('Should return 204 on load surveys with valid access token and there are no data in database', async () => {
      const accountId = await accountCollection.insertOne({ name: 'Leonardo Albuquerque', email: 'ricalb@mail.com', password: '123' })
      const account = await accountCollection.findOne({ _id: accountId.insertedId })
      const accessToken = sign({ id: account?._id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: accountId.insertedId }, { $set: { accessToken } })
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
    test('Should return 200 on load surveys with valid access token', async () => {
      const accountId = await accountCollection.insertOne({ name: 'Leonardo Albuquerque', email: 'ricalb@mail.com', password: '123' })
      const survey: AddSurveyModel = {
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'http://imagem.com/this-is-a-image.png'
        }],
        created_at: new Date()
      }
      await surveyCollection.insertOne(survey)
      const account = await accountCollection.findOne({ _id: accountId.insertedId })
      const accessToken = sign({ id: account?._id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: accountId.insertedId }, { $set: { accessToken } })
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})

request(app)
