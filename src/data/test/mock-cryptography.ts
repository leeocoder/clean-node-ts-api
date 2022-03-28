import { Decrypter } from "@/data/protocols/cryptography/decrypter"
import { Encrypter } from "@/data/protocols/cryptography/encrypter"
import { HashComparer } from "@/data/protocols/cryptography/hash-comparer"
import { Hasher } from "@/data/protocols/cryptography/hasher"

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class Encrypter implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new Encrypter()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparer implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparer()
}