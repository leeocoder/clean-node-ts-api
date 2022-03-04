import { AccountModel } from '../../../../domain/models/account'

export const map = (accountMongo: any): AccountModel => {
  const account = {
    id: String(accountMongo?._id.toString()),
    name: accountMongo?.name,
    email: accountMongo?.email,
    password: accountMongo?.password
  }
  return account
}
