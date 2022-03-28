
import { SaveSurveyResultRepository, SaveSurveyResult, SurveyResultModel, SaveSurveyResultParams } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const survey = this.saveSurveyResultRepository.save(data)
    return survey
  }

}