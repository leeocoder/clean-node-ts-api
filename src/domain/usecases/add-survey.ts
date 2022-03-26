import { SurveyAnswerModel } from '@/domain/models/survey'

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswerModel[]
  created_at: Date
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
