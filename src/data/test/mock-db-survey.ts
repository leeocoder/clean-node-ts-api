import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository"
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository"
import { SurveyModel } from "@/domain/models/survey"
import { mockSurveyModel, mockSurveysModel } from "@/domain/test/mock-survey"
import { AddSurveyParams } from "@/domain/usecases/survey/add-survey"
import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-surveys-repository"

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (SurveyData: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {

  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {

  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel())
    }
  }

  return new LoadSurveysRepositoryStub()
}