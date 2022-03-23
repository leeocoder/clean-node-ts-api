// import { LoadAccountByToken } from './../../../domain/usecases/load-account-by-token';
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

const makeFakeAccount = (): AccountModel => ({ id: 'valid_id', name: 'valid_name', email: 'valid_email', password: 'hashed_password' })

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository =>  {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}
interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}
const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('DbLoadAccountByToken UseCase', () => {
test('Should call decrypter with correct values', async () => {
  const { sut, decrypterStub } = makeSut()
  const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
  await sut.load('any_token', 'any_role')
  expect(decryptSpy).toHaveBeenCalledWith('any_token')
})
test('Should return null if decrypter return null', async () => {
  const { sut, decrypterStub } = makeSut()
  jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
  const account = await sut.load('any_token', 'any_role')
  expect(account).toBeNull()
})
test('Should throw if decrypter throw', async () => {
  const { sut, decrypterStub } = makeSut()
  jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(new Error()))
  const promise = sut.load('any_token', 'any_role')
  await expect(promise).rejects.toThrow()
})
test('Should call LoadAccountByTokenRepository with correct values', async () => {
  const { sut, loadAccountByTokenRepositoryStub } = makeSut()
  const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
  await sut.load('any_token', 'any_role')
  expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
})
test('Should return null if LoadAccountByTokenRepository return null', async () => {
  const { sut, loadAccountByTokenRepositoryStub } = makeSut()
  jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
  const account = await sut.load('any_token', 'any_role')
  expect(account).toBeNull()
})
test('Should return an account on success', async () => {
  const { sut } = makeSut()
  const account = await sut.load('any_token', 'any_role')
  expect(account).toEqual(makeFakeAccount())
})
test('Should throw if LoadAccountByTokenRepository throw', async () => {
  const { sut, loadAccountByTokenRepositoryStub } = makeSut()
  jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.reject(new Error()))
  const promise = sut.load('any_token', 'any_role')
  await expect(promise).rejects.toThrow()
})
})