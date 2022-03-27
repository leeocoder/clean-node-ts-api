import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (SurveyData: AddSurveyModel) => Promise<void>
}
