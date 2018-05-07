var express = require('express')
var router = express.Router()
var db = require('../models')
var passport = require('../config/passport.js')
var isAuthenticated = require('./utils/isAuthenticated.js')

/**
 * Discover API path '/api/teacher'
 *   - To access teacher's UUID: `req.uuid`
 *     (uuid added to `req` object by `isAuthenticated` middleware)
 */

router.route('/login')
  .post(passport.authenticate('local'), (req, res, next) => {
    res.json('/teacher/dashboard')
  })

router.route('/signup')
  .post((req, res, next) => {
    db.User.create({ email: req.body.email, password: req.body.password })
      .then(() => res.redirect(307, '/api/teacher/login'))
      .catch((err) => res.status(422).json(err.errors[0].message))
  })

router.route('/logout')
  .post(isAuthenticated, (req, res, next) => {
    // Passport.js method to end user session
    req.logout()
    // express-session method to destroy session in redis
    req.session.destroy(err => console.error(err))
    res.json('/')
  })

// This path is for the teacher to see their dashboard list of classes and be able to delete a class
router.route('/dashboard')
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
