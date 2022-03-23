import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
describe('DbLoadAccountByToken UseCase', () => {
test('Should call decrypter with correct values', async () => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }
  const decrypterStub = new DecrypterStub()
  const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
  const sut = new DbLoadAccountByToken(decrypterStub)
  await sut.load('any_token')
  expect(decryptSpy).toHaveBeenCalledWith('any_token')
})
})