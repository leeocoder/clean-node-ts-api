import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { Collection } from 'mongodb'
import mockDate from 'mockdate'

let surveyCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }],
    created_at: new Date()
  }
}

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
      await sut.add(makeFakeSurvey())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
  describe('loadAll()', () => {
    test('Should load all a surveys on success', async () => {
      await surveyCollection.insertMany([makeFakeSurvey()])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(1)
      expect(surveys[0]?.question).toBe('any_question')
    })
    test('Should load all empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
  describe('loadById()', () => {
    test('Should load survey by on success', async () => {
      const account = await surveyCollection.insertOne(makeFakeSurvey())
      const sut = makeSut()
      const survey = await sut.loadById(String(account.insertedId))
      expect(survey).toBeTruthy()
    })
  })
})
