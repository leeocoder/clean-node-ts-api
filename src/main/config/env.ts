export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://leeodev:U7fEqjbuabeDoufw@survey-clean-api.j3qfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'eHltDF_+12=4'
}
