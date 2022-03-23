import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'



const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return await Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}
interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}
const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return { sut, decrypterStub }
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
})