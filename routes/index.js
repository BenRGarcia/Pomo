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
router.get('/teacher/store', (req, res, next) => res.render('store', { layout: '/layouts/layoutTeacher' }))

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
router.get('/teacher/class/:uuid/manage', /* isAuthenticated, */(req, res, next) => {
  var class_uuid = req.params.uuid
  db.Student.findAll({
    where: { class_uuid },
    include: [{
      model: db.Task,
      where: { is_done: false },
      required: false
    }]
  })
    .then(students => res.render('classManage', { students, layout: '/layouts/layoutTeacher' }))
    .catch(err => res.json(err))
})

// Student dashboard
router.get('/student/:uuid/dashboard', (req, res, next) => {
  var uuid = req.params.uuid
  db.Task.findAll({ where: { student_uuid: uuid, is_done: false } })
    .then(Tasks => res.render('studentDashboard', { Tasks: Tasks[0], layout: '/layouts/layoutStudent' }))
    .catch(err => res.json(err))
})

module.exports = router
