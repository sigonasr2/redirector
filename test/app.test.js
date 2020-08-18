const request = require('supertest')
const app = require('../app/app')

describe('Endpoints: /home', () => {
  it('should return hello, world on GET: /home', async () => {
    return request(app)
      .get('/home')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.data).toBe('hello, world')
      })
  })
})
