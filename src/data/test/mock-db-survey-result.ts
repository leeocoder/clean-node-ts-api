import { mockSurveyResultModel } from './../../domain/test/mock-survey-result';
import { SurveyResultModel } from './../../domain/models/survey-result';
import { SaveSurveyResultParams } from './../../domain/usecases/survey-result/save-survey-result';
import { SaveSurveyResultRepository } from './../protocols/db/survey-result/save-survey-result-repository';
export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultRepositoryStub()
}