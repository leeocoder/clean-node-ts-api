export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  created_at: Date
}

export type SurveyAnswerModel = {
  image?: string
  answer: string
}
