
import { SaveSurveyResultRepository, SaveSurveyResult, SurveyResultModel, SaveSurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    this.saveSurveyResultRepository.save(data)
    return await Promise.resolve({
      id: 'any_id',
      account_id: 'any_account_id',
      survey_id: 'any_survey_id',
      answer: 'any_answer',
      created_at: new Date()
    })
  }

}