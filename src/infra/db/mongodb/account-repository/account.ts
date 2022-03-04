import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const resultId = await accountCollection.insertOne(accountData)
    const accountMongo = await accountCollection.findOne({ _id: resultId.insertedId })
    const account = {
      id: String(accountMongo?._id.toString()),
      name: accountMongo?.name,
      email: accountMongo?.email,
      password: accountMongo?.password
    }
    return account
  }
}
