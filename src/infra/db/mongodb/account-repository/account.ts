import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const resultId = await accountCollection.insertOne(accountData)
    const accountMongo = await accountCollection.findOne({ _id: resultId.insertedId })
    const account = MongoHelper.map(accountMongo)
    return account
  }
}
