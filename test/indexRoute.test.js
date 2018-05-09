var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('localhost:8080', function () {
  it('`/` should return server status `200`', function (done) {
    chai.request('http://localhost:8080')
      .get('/')
      .end(function (er, res) {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('`/teacher/login` should return server status `200`', function (done) {
    chai.request('http://localhost:8080')
      .get('/teacher/login')
      .end(function (er, res) {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('`/teacher/signup` should return server status `200`', function (done) {
    chai.request('http://localhost:8080')
      .get('/teacher/signup')
      .end(function (er, res) {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('`/teacher/dashboard` *unauthenticated* should return server status `401`', function (done) {
    chai.request('http://localhost:8080')
      .get('/teacher/dashboard')
      .end(function (er, res) {
        expect(res).to.have.status(401)
        done()
      })
  })

  it('`/teacher/store` *unauthenticated* should return server status `401`', function (done) {
    chai.request('http://localhost:8080')
      .get('/teacher/store')
      .end(function (er, res) {
        expect(res).to.have.status(401)
        done()
      })
  })

  it('`/student/login` should return server status `200`', function (done) {
    chai.request('http://localhost:8080')
      .get('/student/login')
      .end(function (er, res) {
        expect(res).to.have.status(200)
        done()
      })
  })
})
