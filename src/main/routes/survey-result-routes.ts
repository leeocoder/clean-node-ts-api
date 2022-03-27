import { makeSaveSurveyResultController } from './../factories/controllers/survey/survey-result/save-survey-result/save-surveys-result-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
