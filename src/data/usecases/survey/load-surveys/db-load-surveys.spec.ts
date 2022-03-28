import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { mockLoadSurveysRepository } from '@/data/test'
import { throwError, mockSurveysModel } from '@/domain/test'
import mockDate from 'mockdate'



type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
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
  expect(surveys).toEqual(mockSurveysModel())
})
test('Should throw if LoadSurveysRepository throw', async () => {
  const { sut, loadSurveysRepositoryStub } = makeSut()
  jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
  const promise = sut.load()
  await expect(promise).rejects.toThrow()
})
})
