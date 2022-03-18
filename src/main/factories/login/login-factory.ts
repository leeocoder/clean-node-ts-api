import { AccountMongoRepository } from './../../../infra/db/mongodb/account/account-mongo-repository'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication'
import { LogMongoRepository } from './../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from './../../decorators/log-controller-decorator'
import { LoginController } from './../../../presentation/controllers/login/login-controller'
import { Controller } from './../../../presentation/protocols/controller'
import BcryptAdapter from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import env from '../../config/env'
export const makeLoginController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
