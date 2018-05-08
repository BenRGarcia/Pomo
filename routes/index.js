var express = require('express')
var router = express.Router()
var db = require('../models')
var isAuthenticated = require('./utils/isAuthenticated.js')

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
router.get('/teacher/login', (req, res, next) => res.render('teacherLogin', { layout: '/layouts/layoutHome' }))

// Teacher sign up page
router.get('/teacher/signup', (req, res, next) => res.render('teacherSignup', { layout: '/layouts/layoutHome' }))

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
    // .then(students => res.render('classManage', { students, layout: '/layouts/layoutTeacher' }))
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
})

// Student dashboard
router.get('/dashboard/student', /* add psuedo-authentication, */(req, res, next) => {
  res.render('studentDashboard', { layout: '/layouts/layoutStudent' })
  // var uuid = req.params.uuid
  // // Davis - how do we query the DB for a student's incomplete tasks?
  // db.Student.find({
  //   where: { uuid },
  //   include: {
  //     model: db.Task,
  //     where: { is_done: false }
  //   }
  // })
  //   .then(resp => res.json(resp))
  //   // .then(resp => res.render('studentDashboard', { resp, layout: '/layouts/layoutStudent' }))
  //   .catch(err => res.json(err))
})

module.exports = router
