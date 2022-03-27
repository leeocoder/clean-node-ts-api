import { ObjectId } from 'mongodb'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[] > {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveysMongo = await surveyCollection.find().toArray()
    return MongoHelper.mapArray(surveysMongo)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveyMongo = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return surveyMongo && MongoHelper.map(surveyMongo)
  }
}
