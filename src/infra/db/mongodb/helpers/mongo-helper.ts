import { Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: null as unknown as any,
  uri: null as unknown as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect () {
    await this.client.close()
    this.client = null
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map (data: any): any {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: String(_id) })
  },

  mapArray (collection: any[]): any[] {
    return collection.map(data => MongoHelper.map(data))
  }
}
