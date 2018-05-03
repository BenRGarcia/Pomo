var express = require('express')
var router = express.Router()

/**
 * API path '/api/students'
 * GET/POST student data (start/finish task, student login) through this path
 */

router.route('/')
  // GET requests for this path
  .get((req, res, next) => {
    res.render('index', { title: 'Express' })
  })
  // POST requests for this path
  .post((req, res, next) => {
    res.render('index', { title: 'Express' })
  })
  // PUT requests for this path
  .put((req, res, next) => {
    res.render('index', { title: 'Express' })
  })
  // DELETE requests for this path
  .delete((req, res, next) => {
    res.render('index', { title: 'Express' })
  })

router.route('/someOtherPath')
  // GET requests for this path
  .get((req, res, next) => {
    res.render('index', { title: 'Express' })
  })

module.exports = router
