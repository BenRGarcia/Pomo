var express = require('express')
var router = express.Router()
var db = require('../models')
var isAuthenticated = require('./utils/isAuthenticated.js')

/**
 * API path '/api/class'
 */

router.route('/student')

  // Handle when teacher adds new student
  .post(isAuthenticated, (req, res, next) => {
    // Get data from req body
    var name = req.body.name
    var student_id = req.body.student_id
    var class_uuid = req.body.class_uuid
    // Create student in db
    db.Student.create({ name, student_id, class_uuid })
      .then(() => res.status(201).send())
      .catch(() => res.status(400).send())
  })

  // Handle when teacher deletes student(s)
  .delete(isAuthenticated, (req, res, post) => {
    var arrayOfStudentUUIDsToDelete = req.body
    db.Student.bulkDelete({ where: { [Op.or]: arrayOfStudentUUIDsToDelete } })
  })

module.exports = router
