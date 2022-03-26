import { AddSurveyModel } from '@/domain/usecases/add-survey'

export interface AddSurveyRepository {
  add: (SurveyData: AddSurveyModel) => Promise<void>
}
