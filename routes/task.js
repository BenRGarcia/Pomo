var express = require('express')
var router = express.Router()
var db = require('../models')
var isAuthenticated = require('./utils/isAuthenticated.js')

// Credit coins to student
var creditCoins = (studentUUID, coins) => {
  return new Promise((resolve, reject) => {
    db.Student.findOne({ where: { uuid: studentUUID } })
      .then(student => resolve(student.increment('coin_count', { by: coins })))
      .catch(err => reject(err))
  })
}

/**
 * API Path '/api/task'
 */

// Teacher creates new task for student
router.route('/new')
  // Assuming req body will be an array of task objects
  .post(isAuthenticated, (req, res, next) => {
    console.log(`\n=========\nWe just got a task bulk post request`)
    console.log(req.body.queryArray)
    // Bulk update db
    db.Task.bulkCreate(req.body)
      .then(() => res.status(201).send())
    res.status(200).send()
  })

// Student starts the timer (clicks `start` button)
router.route('/timer/start')
  .post((req, res, next) => {
    // Get task uuid from req body
    var taskUUID = req.body.taskUUID
    // Update task with start time
    db.Task.update({ start_time: Date.now() }, { where: { uuid: taskUUID } })
      .then(() => res.status(204).send())
  })

// Student stops the timer (clicks `done` button)
router.route('/timer/done')
  .put((req, res, next) => {
    // Get task uuid from req body
    var taskUUID = req.body.taskUUID
    // Find task
    db.Task.findOne({ where: { uuid: taskUUID } })
      // Credit coins to student associated with task
      .then(task => creditCoins(task.student_UUID, task.coin_value))
      // Update task with `is_done` boolean
      .then(() => db.Task.update({ is_done: true }, { where: { uuid: taskUUID } }))
      // Send success response to client
      .then(() => res.status(204).send())
  })

module.exports = router
