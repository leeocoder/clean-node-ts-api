const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb://localhost:27017/survey-api'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

(async () => {
  client.connect(err => {
    console.log('entrou')
    const collection = client.db('survey-api').collection('users')
    console.log(collection)
    console.log(err)
    client.close()
  })
})()
