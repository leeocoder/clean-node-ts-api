import { SurveyModel } from './../../../../domain/models/survey'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import { AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[] > {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveysMongo = await surveyCollection.find().toArray()
    const surveys: SurveyModel[] = surveysMongo.map(survey => {
      return {
        id: String(survey._id),
        question: survey.question,
        answers: [...survey.answers],
        created_at: survey.created_at
      }
    })
    return surveys
  }
}
