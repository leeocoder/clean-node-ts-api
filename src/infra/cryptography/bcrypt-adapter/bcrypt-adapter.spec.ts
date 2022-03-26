import BcryptAdapter from './bcrypt-adapter'
import bcrypt from 'bcrypt'

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
  describe('hash()', () => {
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
    test('should throw if hash throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.hash('any_values')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('comparer()', () => {
    test('should call compare with correct values', async () => {
      const { sut } = makeSut()
      const comparerSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(comparerSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
    test('should return true when comparer succeeds', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return false
      })
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBeFalsy()
    })
    test('should return false when comparer fails', async () => {
      const { sut } = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBeTruthy()
    })
    test('Should throw if hash throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare('any_values', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
