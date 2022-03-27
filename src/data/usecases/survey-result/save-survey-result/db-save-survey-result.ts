
import { SaveSurveyResultRepository, SaveSurveyResult, SurveyResultModel, SaveSurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const survey = this.saveSurveyResultRepository.save(data)
    return survey
  }

}