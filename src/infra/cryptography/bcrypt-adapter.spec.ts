import bcrypt from 'bcrypt'
import BcryptAdapter from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
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
  test('should call hash with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_values')
    expect(hashSpy).toHaveBeenCalledWith('any_values', salt)
  })
  test('should return a valid hash hash success', async () => {
    const { sut } = makeSut()
    const hash = await sut.hash('any_values')
    expect(hash).toBe('hash')
  })
  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash('any_values')
    await expect(promise).rejects.toThrow()
  })
  test('should call compare with correct values', async () => {
    const { sut } = makeSut()
    const comparerSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(comparerSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
})
