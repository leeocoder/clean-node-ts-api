import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import mockDate from 'mockdate'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeInsertSurvey = async (): Promise<SurveyModel> => {
  const surveyLastInsert = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }],
    created_at: new Date()
  })
  const surveyModel = await surveyCollection.findOne({ _id: surveyLastInsert.insertedId })
  const survey: SurveyModel = MongoHelper.map(surveyModel)
  return survey
}
const makeInsertAccount = async (): Promise<AccountModel> => {
  const accountLastInsert = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const accountModel = await accountCollection.findOne({ _id: accountLastInsert.insertedId })
  const account: AccountModel = MongoHelper.map(accountModel)
  return account
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if it\'s new', async () => {
      const sut = makeSut()
      const survey = await makeInsertSurvey()
      const account = await makeInsertAccount()
      const newSurvey = (): SaveSurveyResultModel => ({
        survey_id: survey.id,
        account_id: account.id,
        answer: survey.answers[0].answer,
        created_at: new Date()
      })
      const surveyResult = await sut.save(newSurvey())
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
    test('Should update a survey result if already exists', async () => {
      const sut = makeSut()
      const survey = await makeInsertSurvey()
      const account = await makeInsertAccount()
      const newResultSurvey = (): SaveSurveyResultModel => ({
        survey_id: survey.id,
        account_id: account.id,
        answer: survey.answers[0].answer,
        created_at: new Date()
      })
      const insertedSurveyResult = await surveyResultCollection.insertOne(newResultSurvey())
      const surveyResult = await sut.save(Object.assign({}, newResultSurvey(), { answer: 'updated_answer' }))
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(String(insertedSurveyResult.insertedId))
      expect(surveyResult.answer).toBe('updated_answer')
    })
  })
})
