var express = require('express')
var router = express.Router()
var db = require('../models')

/**
 * API path '/api/classes'
 * GET/POST/PUT class data (create/edit/delete classes and students) through this path
 */

router.route('/api/classes')
  // GET requests for this path
  .get((req, res, next) => {
    db.Class.findAll({
      include: [db.User, db.Student]
    }).then(function (dbClass) {
      res.json(dbClass)
    })
  })
  // POST requests for this path
  .post((req, res, next) => {
    db.Class.create(req.body).then(function (dbClass) {
      res.json(dbClass)
    })
  })
  // PUT requests for this path
  .put((req, res, next) => {
    db.Class.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbClass) {
      res.json(dbClass)
    })
  })

router.route('/api/classes/:id')
  // GET requests for this path
  .get((req, res, next) => {
    db.Class.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Student]
    }).then(function (dbClass) {
      res.json(dbClass)
    })
  })

module.exports = router
