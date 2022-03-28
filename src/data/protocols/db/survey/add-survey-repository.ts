import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (SurveyData: AddSurveyParams) => Promise<void>
}
