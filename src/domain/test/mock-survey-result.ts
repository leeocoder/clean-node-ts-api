import { SurveyResultModel } from './../models/survey-result'
export const mockSurveyResultModelParams = (): Omit<SurveyResultModel, 'id'> => (
  {
    survey_id: 'any_survey_id',
    account_id: 'any_account_id',
    answer: 'any_answer',
    created_at: new Date()
  })

export const mockSurveyResultModel = ():
SurveyResultModel => Object.assign(
  {}, mockSurveyResultModelParams(), {
    id: 'any_id'
  })
