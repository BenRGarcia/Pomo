var express = require('express')
var router = express.Router()
var db = require('../models')

/**
 * Discover API path '/api/dashboard'
 */

router.route('/api/teacher/dashboard')
  // DELETE requests for this path
  .delete((req, res, next) => {
    db.Class.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (dbClass) {
      res.json(dbClass)
    })
  })

router.route('/api/student/dashboard')
  // GET requests for this path
  .get((req, res, next) => {
    res.render('index', { title: 'Express' })
  })

module.exports = router
