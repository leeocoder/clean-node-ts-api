import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockAddAccountParams = (): AddAccountParams => (
  {
    name: 'any_name',
    email: 'any_email',
    password: 'hashed_password'
  })

export const mockAccountModel = ():
AccountModel => Object.assign(
  {}, mockAddAccountParams(), {
    id: 'any_id'
  })

export const mockAuthentication = (): AuthenticationParams => (
  {
    email: 'any_email@gmail.com',
    password: 'hashed_password'
  })
