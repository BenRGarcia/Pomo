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
router.get('/', (req, res, next) => res.render('index', { layout: '/layouts/layoutTeacher' }))

// Student login page
router.get('/student/login', (req, res, next) => res.render('studentLogin', { layout: '/layouts/layoutStudent' }))

// Teacher log in page
router.get('/teacher/login', (req, res, next) => res.render('teacherLogin', { layout: '/layouts/layoutTeacher' }))

// Teacher sign up page
router.get('/teacher/signup', (req, res, next) => res.render('teacherSignup', { layout: '/layouts/layoutTeacher' }))

// Class store page (hard coded future-feature)
router.get('/teacher/store', (req, res, next) => res.render('store', { layout: '/layouts/layoutTeacher' }))

/**
 * Dynamic pages
 */

// Teacher dashboard page
router.get('/teacher/dashboard', /* isAuthenticated, */(req, res, next) => {
  res.render('teacherDashboard', { layout: '/layouts/layoutTeacher' })
  // // Davis - how do we query the DB for all the teacher's classes?
  // db.User.find({
  //   where: { uuid: req.uuid },
  //   include: { model: db.Class }
  // })
  //   .then(resp => res.json(resp))
  //   // .then(resp => res.render('teacherDashboard', { resp, layout: '/layouts/layoutTeacher' }))
  //   .catch(err => res.json(err))
})

// Teacher edits a class page (add/delete students in the class)
router.get('/teacher/class/:uuid/edit', /* isAuthenticated, */(req, res, next) => {
  res.render('classEdit', { layout: '/layouts/layoutTeacher' })
  // // Davis - how do we query the DB for all students in a teacher's individual class?
  // db.User.find({
  //   where: { uuid: req.uuid },
  //   include: {
  //     model: db.Class,
  //     where: { uuid: req.params.uuid },
  //     include: {
  //       model: db.Student,
  //       where: { class_uuid: req.params.uuid }
  //     }
  //   }
  // })
  //   .then(resp => res.json(resp))
  //   // .then(resp => res.render('classEdit', { resp, layout: '/layouts/layoutTeacher' }))
  //   .catch(err => res.json(err))
})

// Teacher sets tasks, times to students (day to day stuff)
router.get('/teacher/class/:uuid', /* isAuthenticated, */(req, res, next) => {
  res.render('classManage', { layout: '/layouts/layoutTeacher' })
  // // Davis - how do we query the DB for all students in a teacher's individual class?
  // db.User.find({
  //   where: { uuid: req.uuid },
  //   include: {
  //     model: db.Class,
  //     where: { uuid: req.params.uuid },
  //     include: {
  //       model: db.Student,
  //       where: { class_uuid: req.params.uuid }
  //     }
  //   }
  // })
  //   .then(resp => res.json(resp))
  //   // .then(resp => res.render('classManage', { resp, layout: '/layouts/layoutTeacher' }))
  //   .catch(err => res.json(err))
})

// Student dashboard
router.get('/dashboard/student/:uuid', /* add psuedo-authentication, */(req, res, next) => {
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
