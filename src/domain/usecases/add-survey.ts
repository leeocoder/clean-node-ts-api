export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  created_at: Date
}
export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
