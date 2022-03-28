import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultParams, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { mockSaveSurveyResultRepository } from '@/data/test'
import { mockSurveyResultModelParams, mockSurveyResultModel, throwError } from '@/domain/test'
import mockDate from 'mockdate'



type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return { sut, saveSurveyResultRepositoryStub }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => { mockDate.set(new Date ()) })
  afterAll(() => { mockDate.reset() })
  test('Should calls SaveSurveyRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(mockSurveyResultModelParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSurveyResultModelParams())
  })
  test('Should return a Survey Result on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.save(mockSurveyResultModelParams())
    expect(survey).toEqual(mockSurveyResultModel())
  })
  test('Should throw if saveSurveyResultRepository throw', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultModelParams())
    await expect(promise).rejects.toThrow()
  })

})
