import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
describe('Bcrypt Adapter', () => {
  const salt = 12
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_values')
    expect(hashSpy).toHaveBeenCalledWith('any_values', salt)
  })
})
