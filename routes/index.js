var express = require('express')
var router = express.Router()
var db = require('../models')
var isAuthenticated = require('./utils/isAuthenticated.js')
var csrf = require('csurf')
var csrfProtection = csrf()

/***************
 * HTML Routes *
 ***************/

/**
 * Static pages
 *   - To access teacher's UUID: `req.uuid`
 *     (uuid added to `req` object by `isAuthenticated` middleware)
 */

// Home page
router.get('/', (req, res, next) => res.render('index', { layout: '/layouts/layoutHome' }))

// Student login page
router.get('/student/login', (req, res, next) => res.render('studentLogin', { layout: '/layouts/layoutStudent' }))

// Teacher log in page
router.get('/teacher/login', csrfProtection, (req, res, next) => {
  res.render('teacherLogin', { layout: '/layouts/layoutHome', csrfToken: req.csrfToken() })
})

// Teacher sign up page
router.get('/teacher/signup', csrfProtection, (req, res, next) => {
  res.render('teacherSignup', { layout: '/layouts/layoutHome', csrfToken: req.csrfToken() })
})

// Class store page (hard coded future-feature)
router.get('/teacher/store', (req, res, next) => res.render('store', { layout: '/layouts/layoutStudent' }))

/**
 * Dynamic pages
 */

// Teacher dashboard page
router.get('/teacher/dashboard', isAuthenticated, (req, res, next) => {
  db.Class.findAll({ where: { user_uuid: req.uuid } })
    .then(classes => res.render('teacherDashboard', { classes, layout: '/layouts/layoutTeacher' }))
    .catch(err => res.json(err))
})

// Teacher sets tasks, times to students (day to day stuff)
router.get('/teacher/class/:uuid/manage', isAuthenticated, (req, res, next) => {
  var class_uuid = req.params.uuid
  var classPassword
  var className
  db.Class.findOne({ where: { uuid: class_uuid } })
    .then(classData => {
      className = classData.dataValues.name
      classPassword = classData.dataValues.password
      return className
    })
    .then(() => {
      return db.Student.findAll({
        where: { class_uuid },
        include: [{
          model: db.Task,
          where: { is_done: false },
          required: false
        }]
      })
    })
    .then(students => res.render('classManage', { students, class_uuid, classPassword, className, layout: '/layouts/layoutTeacher' }))
    .catch(err => res.json(err))
})

// Student dashboard
router.get('/student/:uuid/dashboard', (req, res, next) => {
  var uuid = req.params.uuid
  var coin_count
  db.Student.findOne({ where: { uuid: uuid } })
    .then(student => {
      coin_count = student.coin_count
      return coin_count
    })
    .then(() => db.Task.findAll({ where: { student_uuid: uuid, is_done: false } }))
    .then(Tasks => res.render('studentDashboard', { Tasks: Tasks[0], coins: coin_count, layout: '/layouts/layoutStudent' }))
    .catch(err => res.json(err))
})

module.exports = router
