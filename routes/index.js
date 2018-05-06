var express = require('express')
var router = express.Router()

/**
 * HTML Routes
 */

// Home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
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
router.get('/teacher/:uuid/dashboard', (req, res, next) => {
  // Run sequelize query here, pass to .hbs
  res.render('teacherDashboard', {/* give me db results */})
})

// Teacher create, edit class
router.get('/teacher/:uuid/edit', (req, res, next) => {
  // Run sequelize query here, pass to .hbs
  res.render('classEdit', {/* give me db results */ })
})

// Teacher manage class (day to day stuff)
router.get('/teacher/:uuid/manage', (req, res, next) => {
  // Run sequelize query here, pass to .hbs
  res.render('classManage', {/* give me db results */ })
})

// Student login
router.get('/student/login', (req, res, next) => {
  res.render('studentLogin')
})

// Student dashboard
router.get('/student/:uuid/dashboard', (req, res, next) => {
  res.render('studentDashboard', {/* give me db results */})
})

module.exports = router
