import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import { app } from './config/app'

MongoHelper.connect(env.mongoUrl)
  .finally(() => {
    app.listen(env.port, () => console.log(`Server is running on port: http://locahost:${env.port}`))
  }).catch(console.error)
