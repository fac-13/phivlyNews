const test = require('tape')
const supertest = require('supertest')

const router = require('./router')

test('initialise', (t)=>{
  t.equal(2, 2, "Tape is working")
  t.end()
})

//Home Route

test('Home route returns a status code of 200', (t) => {
  supertest(router)
   .get('/')
   .expect(200)
   .expect('Content-Type',/html/)
   .end((err, res) => {
     t.error(err)
     t.equal(res.statusCode, 200, 'Should return 200')
     t.end()
   })
})

test('Public route returns a status code of 200', (t) => {
  supertest(router)
   .get('/public/style.css')
   .expect(200)
   .end((err, res) => {
     t.error(err)
     t.equal(res.statusCode, 200, 'Should return 200')
     t.end()
   })
})

test('Search route returns a status code of 200', (t) => {
  supertest(router)
   .get('/search') //potentially add /search/*
   .expect(200)
   .end((err, res) => {
     t.error(err)
     t.equal(res.statusCode, 200, 'Should return 200')
     t.end()
   })
})

test('no existing route returns 404', (t) =>{
  supertest(router)
  .get('/elephant')
  .expect(404)
  .end((err, res) => {
    t.error(err)
    t.equal(res.statusCode, 404, 'Should return 404')
    t.end()
  })
})
