import { DbLoadSurveyById } from './db-load-survey-by-id'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import mockDate from 'mockdate'

const makeFakeSurvey = (): SurveyModel => {
  const fakeSurveys: SurveyModel = {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'http://www.any_image.com/image.png',
      answer: 'any_answer'
    }],
    created_at: new Date()
  }
  return fakeSurveys
}

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {

  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(makeFakeSurvey())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
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
})