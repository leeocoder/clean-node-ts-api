import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository, SurveyModel } from './db-load-surveys-protocols'
import mockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  const fakeSurveys: SurveyModel[] = [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'http://www.any_image.com/image.png',
      answer: 'any_answer'
    }],
    created_at: new Date()
  }, {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'http://www.any_image.com/image.png',
      answer: 'any_answer'
    }],
    created_at: new Date()
  }]
  return fakeSurveys
}

const makeLoadSurveysRepositoryStub = (): LoadSurveysRepository => {

  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }

  return new LoadSurveysRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return { sut, loadSurveysRepositoryStub }
}

describe('DbLoadSurveys', () => {
  beforeAll(()=> { mockDate.set(new Date())  })
  afterAll(()=> { mockDate.reset()  })
test('Should call LoadSurveysRepository', async () => {
  const { sut, loadSurveysRepositoryStub } = makeSut()
  const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
  await sut.load()
  expect(loadAllSpy).toBeCalled()
})
test('Should return a list of Surveys on success', async () => {
  const { sut } = makeSut()
  const surveys = await sut.load()
  expect(surveys).toEqual(makeFakeSurveys())
})
test('Should throw if LoadSurveysRepository throw', async () => {
  const { sut, loadSurveysRepositoryStub } = makeSut()
  jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
  const promise = sut.load()
  await expect(promise).rejects.toThrow()
})
})
