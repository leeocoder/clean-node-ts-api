import { app } from '../config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (request, response) => {
      return response.send()
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
  test('Should return xml default content type when forced', async () => {
    app.get('/test_content_type_xml', (request, response) => {
      response.type('xml')
      return response.send()
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})

request(app)
