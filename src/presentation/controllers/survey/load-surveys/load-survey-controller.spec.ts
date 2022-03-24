import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
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
describe('Load Surveys Controller', () => {
  beforeAll(() => { mockDate.set(new Date()) })
  afterAll(() => { mockDate.reset() })
  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load (): Promise<SurveyModel[]> {
        return await Promise.resolve(makeFakeSurveys())
      }
    }
    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const sut = new LoadSurveysController(loadSurveysStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
