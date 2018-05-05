var express = require('express')
var router = express.Router()
var db = require('../models')

/**
 * API path '/api/students'
 * GET/POST student data (start/finish task, student login) through this path
 */

router.route('/api/students')
  // GET requests for this path
  .get((req, res, next) => {
    db.Student.findAll({
      include: [db.Class, db.Task]
    }).then(function (dbStudent) {
      res.json(dbStudent)
    })
  })
  // POST requests for this path
  .post((req, res, next) => {
    db.Student.create(req.body).then(function (dbStudent) {
      res.json(dbStudent)
    })
  })
  // PUT requests for this path
  .put((req, res, next) => {
    db.Student.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbStudent) {
      res.json(dbStudent)
    })
  })
  // DELETE requests for this path
  .delete((req, res, next) => {
    db.Student.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbStudent) {
      res.json(dbStudent)
    })
  })

router.route('/api/students/:id')
  // GET requests for this path
  .get((req, res, next) => {
    db.Student.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Class, db.Task]
    }).then(function (dbStudent) {
      res.json(dbStudent)
    })
  })

module.exports = router
