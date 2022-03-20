export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/survey-api',
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'eHltDF_+12=4'
}
