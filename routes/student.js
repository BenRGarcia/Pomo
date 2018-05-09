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

router.route('/api/students')
  // GET requests for this path
  .get((req, res, next) => {
    db.Student.findAll({ include: [db.Class, db.Task] })
      .then((dbStudent) => res.json(dbStudent))
  })
  // POST requests for this path
  .post((req, res, next) => {
    db.Student.create(req.body)
      .then((dbStudent) => res.json(dbStudent))
  })
  // PUT requests for this path
  .put((req, res, next) => {
    db.Student.update(req.body, { where: { id: req.body.id } })
      .then((dbStudent) => res.json(dbStudent))
  })
  // DELETE requests for this path
  .delete((req, res, next) => {
    db.Student.destroy({ where: { id: req.params.id } })
      .then((dbStudent) => res.json(dbStudent))
  })

router.route('/api/students/:id')
  // GET requests for this path
  .get((req, res, next) => {
    db.Student.findOne({ where: { id: req.params.id }, include: [db.Class, db.Task] })
      .then((dbStudent) => res.json(dbStudent))
  })

module.exports = router
