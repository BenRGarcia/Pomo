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
    var studentId = req.body.name
    var classPassword = req.body.password
    var studentUUID
    // Using the studentId provided, find student's UUID and class UUID association
    db.Student.findOne({ where: { student_id: studentId } })
      // With the class' uuid, find the password for the class as set by the teacher
      .then(student => {
        studentUUID = student.dataValues.uuid
        return db.Class.findOne({ where: { uuid: student.dataValues.class_uuid } })
      })
      // Evaluate password, then redirect student to dashboard
      .then(classData => {
        // If password matches
        if (classPassword === classData.dataValues.password) {
          // Redirect to student dashboard
          res.json({ redirectPath: `/student/${studentUUID}/dashboard` })
        } else {
          // Redirect to login page
          res.json({ redirectPath: `/student/login` })
        }
      })
      .catch(() => res.json({ redirectPath: `/student/login` }))
  })

module.exports = router
