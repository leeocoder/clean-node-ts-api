import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import mockDate from 'mockdate'
import { mockSurveyModel } from '@/domain/test'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    mockDate.set(new Date())
    return await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
    mockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(mockSurveyModel())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
  describe('loadAll()', () => {
    test('Should load all a surveys on success', async () => {
      await surveyCollection.insertMany([mockSurveyModel()])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(1)
      expect(surveys[0]?.question).toBe('any_question')
      expect(surveys[0]?.id).toBeTruthy()
    })
    test('Should load all empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
  describe('loadById()', () => {
    test('Should load survey by on success', async () => {
      const account = await surveyCollection.insertOne(mockSurveyModel())
      const sut = makeSut()
      const survey = await sut.loadById(String(account.insertedId))
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
