import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.findOneAndUpdate({
      survey_id: data.survey_id,
      account_id: data.account_id
    }, {
      $set: {
        answer: data.answer,
        created_at: data.created_at
      }
    }, {
      upsert: true
    })
    const surveyResultMongo = await surveyResultCollection.findOne({
      survey_id: data.survey_id,
      account_id: data.account_id
    })
    const surveyResult: SurveyResultModel = MongoHelper.map(surveyResultMongo)
    return surveyResult
  }
}
