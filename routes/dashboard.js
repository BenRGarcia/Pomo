var express = require('express')
var router = express.Router()
var db = require('../models')

/**
 * Discover API path '/api/teacher'
 */

// This path is for the teacher to see their dashboard list of classes and be able to delete a class
router.route('/:uuid/dashboard')
  // Teacher wants to see the list of classes
  .get((req, res, next) => {
    // Database query to return array of classes
    db.User.findAll({ where: { uuid: req.params.uuid }, include: [db.Class] })
      // Send json object to frontend
      .then(resp => res.json(resp))
  })
  // DELETE requests for this path
  .delete((req, res, next) => {
    db.Class.destroy({ where: { id: req.body.id } })
      .then(dbClass => res.json(dbClass))
      .catch(err => console.error(err))
  })

// For when teacher creates a new class
router.route('/:uuid/class/new')
  .post((req, res, next) => {
    var className = { name: req.body.class_name }
    // need to add associate in this query
    db.Class.create({ className })
      .then(() => res.status(201).send())
      .catch(err => console.error(err))
  })

// For when teacher creates a new class
router.route('/:uuidTeacher/class/:uuidClass')
  .post((req, res, next) => {
    var updatedClass = { class: req.body.class }
    // DB query
    // then(() => {res.status(204).send()})
  })

// For when a teacher adds students to the class (student name, )
router.route('/:uuid_teacher/class/:uuid_/edit')
  // GET list of all students in a class
  .get((req, res, next) => {
    db.Class.findAll({ include: [db.User, db.Student] })
      .then(dbClass => res.json(dbClass))
      .catch(err => console.error(err))
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

router.route('/api/student/dashboard')
  // GET requests for this path
  .get((req, res, next) => {
    res.render('index', { title: 'Express' })
  })

module.exports = router
