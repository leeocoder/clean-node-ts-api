import { LoadAccountByToken } from './../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from './../errors'
import { AuthMiddleware } from './auth-middleware'
import { forbidden } from './../helpers/http/http-helper'
import { AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({ id: 'valid_id', name: 'valid_name', email: 'valid_email', password: 'hashed_password' })

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount())
    }
  }

  return new LoadAccountByTokenStub()
}

interface sutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): sutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  return { sut, loadAccountByTokenStub }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
