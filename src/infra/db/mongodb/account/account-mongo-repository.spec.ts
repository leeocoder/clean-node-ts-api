import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddAccountParams } from '@/domain/test'
import { Collection } from 'mongodb'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    return await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(mockAddAccountParams().name)
      expect(account.email).toBe(mockAddAccountParams().email)
      expect(account.password).toBe(mockAddAccountParams().password)
    })
  })
  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail(mockAddAccountParams().email)
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe(mockAddAccountParams().name)
      expect(account?.email).toBe(mockAddAccountParams().email)
      expect(account?.password).toBe(mockAddAccountParams().password)
    })
    test('Should return null if loadByEmail null', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(mockAddAccountParams().email)
      expect(account).toBeFalsy()
    })
  })
  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne(mockAddAccountParams())
      const accountBeforeUpdate = await accountCollection.findOne({ _id: result.insertedId })
      expect(accountBeforeUpdate?.insertedId).toBeFalsy()
      await sut.updateAccessToken(String(result?.insertedId), 'any_token')
      const account = await accountCollection.findOne({ _id: result.insertedId })
      expect(account).toBeTruthy()
    })
  })
  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token' }))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe(mockAddAccountParams().name)
      expect(account?.email).toBe(mockAddAccountParams().email)
      expect(account?.password).toBe(mockAddAccountParams().password)
    })
    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token', role: 'admin' }))
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe(mockAddAccountParams().name)
      expect(account?.email).toBe(mockAddAccountParams().email)
      expect(account?.password).toBe(mockAddAccountParams().password)
    })
    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token' }))
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })
    test('Should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token', role: 'admin' }))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe(mockAddAccountParams().name)
      expect(account?.email).toBe(mockAddAccountParams().email)
      expect(account?.password).toBe(mockAddAccountParams().password)
    })
    test('Should return null if loadByToken null', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
