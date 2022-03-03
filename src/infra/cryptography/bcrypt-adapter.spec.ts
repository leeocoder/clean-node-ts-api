import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

interface sutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): sutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_values')
    expect(hashSpy).toHaveBeenCalledWith('any_values', salt)
  })
  test('should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_values')
    expect(hash).toBe('hash')
  })
  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_values')
    await expect(promise).rejects.toThrow()
  })
})
