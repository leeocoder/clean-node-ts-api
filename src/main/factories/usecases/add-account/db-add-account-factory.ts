import { AddAccount } from '../../../../domain/usecases/add-account'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import BcryptAdapter from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const hasher = new BcryptAdapter(salt)
  return new DbAddAccount(hasher, accountMongoRepository)
}
