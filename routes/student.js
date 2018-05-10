var express = require('express')
var router = express.Router()
var db = require('../models')

/**
 * API path '/api/students'
 * GET/POST student data (start/finish task, student login) through this path
 */

// Student LOGIN
router.route('/login')
  .post((req, res, next) => {
    // Get data from req body
    var name = req.body.name
    var password = req.body.password
    // Query database for class database
    db.Class.findOne({ where: { howDoWeDoThis: `I don't know` } })
      .then(classData => classData.password)
      .then(classPassword => {
        // Check if class 'password' is correct
        if (classPassword === password) {
          // If yes, find student and redirect to student dashboard page
          db.Student.findOne({ where: { name } })
            .then(student => res.json({ redirectPath: `/student/${student.uuid}/dashboard` }))
        } else {
          // Else redirect to login page
          res.json({ redirectPath: `/student/login` })
        }
      })
      // If error, redirect to login page
      .catch(() => res.json({ redirectPath: `/student/login` }))
  })

module.exports = router
