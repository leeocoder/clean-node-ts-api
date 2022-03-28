import { DbLoadSurveyById } from './db-load-survey-by-id'
import { SurveyModel, LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import { throwError, mockSurveyModel } from '@/domain/test'
import { mockLoadSurveyByIdRepository } from '@/data/test'
import mockDate from 'mockdate'



type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyByIdRepositoryStub }
}

describe('Load Survey By Id', () => {
  beforeAll(()=> { mockDate.set(new Date())  })
  afterAll(()=> { mockDate.reset()  })
test('Should call LoadSurveyByIdRepository', async () => {
  const { sut, loadSurveyByIdRepositoryStub } = makeSut()
  const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
  await sut.loadById('any_id')
  expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
})
test('Should return a Survey on success', async () => {
  const { sut } = makeSut()
  const survey = await sut.loadById(mockSurveyModel().id)
  expect(survey).toEqual(mockSurveyModel())
})

test('Should throw if loadSurveyByIdRepository throw', async () => {
  const { sut, loadSurveyByIdRepositoryStub } = makeSut()
  jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
  const promise = sut.loadById('any_id')
  await expect(promise).rejects.toThrow()
})
})