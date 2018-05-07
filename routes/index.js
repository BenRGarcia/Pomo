var express = require('express')
var router = express.Router()
var db = require('../models')

/**
 * HTML Routes
 */

// Home page
router.get('/', (req, res, next) => {
  res.render('index')
})

// Class store (hard coded feature)
router.get('/store', (req, res, next) => {
  res.render('store')
})

// Teacher log in
router.get('/teacher/login', (req, res, next) => {
  res.render('teacherLogin')
})

// Teacher sign up
router.get('/teacher/signup', (req, res, next) => {
  res.render('teacherSignup')
})

// Teacher dashboard
/* router.get('/teacher/:uuid/dashboard', (req, res, next) => {
  var uuid = req.params.uuid
  // Run sequelize query here, pass to .hbs
  // db.User.find({...}, where: {...}, include: {...})
    .then(resp => {
      res.render('teacherDashboard', resp)
    })
}) */

// Teacher create, edit class
/* router.get('/teacher/:uuid/edit', (req, res, next) => {
  var uuid = req.params.uuid
  // Run sequelize query here, pass to .hbs
  // db.User.find({...}, where: {...}, include: {...})
    .then(resp => {
      res.render('classEdit', resp)
    })
}) */

// Teacher manage class (day to day stuff)
/* router.get('/teacher/:uuid/manage', (req, res, next) => {
  var uuid = req.params.uuid
  // Run sequelize query here, pass to .hbs
  // db.User.find({...}, where: {...}, include: {...})
    .then(resp => {
      res.render('classManage', resp)
    })
}) */

// Student login
router.get('/student/login', (req, res, next) => {
  res.render('studentLogin')
})

// Student dashboard
/* router.get('/student/:uuid/dashboard', (req, res, next) => {
  var uuid = req.params.uuid
  // Run sequelize query here, pass to .hbs
  // db.Student.find({...}, where: { ...}, include: { ...})
    .then(resp => {
      res.render('studentDashboard', resp)
    })
}) */

module.exports = router
