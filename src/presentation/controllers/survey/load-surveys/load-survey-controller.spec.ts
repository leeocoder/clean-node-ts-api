import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'
import mockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
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
}

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return { sut, loadSurveysStub }
}

describe('Load Surveys Controller', () => {
  beforeAll(() => { mockDate.set(new Date()) })
  afterAll(() => { mockDate.reset() })
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
  test('Should returns 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(ok(makeFakeSurveys()))
  })
  test('Should returns 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(noContent())
  })
  test('Should should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(serverError(new Error()))
  })
})
