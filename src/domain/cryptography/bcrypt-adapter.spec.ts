import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

describe('Bcrypt Adapter', () => {
  const salt = 12
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_values')
    expect(hashSpy).toHaveBeenCalledWith('any_values', salt)
  })
  test('should return a hash on success', async () => {
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_values')
    expect(hash).toBe('hash')
  })
})
