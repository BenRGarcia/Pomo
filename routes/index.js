var express = require('express')
var router = express.Router()
var db = require('../models')
var isAuthenticated = require('./utils/isAuthenticated.js')

/***************
 * HTML Routes *
 ***************/

/**
 * Static pages
 */

// Home page
router.get('/', (req, res, next) => res.render('index'))

// Student login page
router.get('/student/login', (req, res, next) => res.render('studentLogin'))

// Teacher log in page
router.get('/teacher/login', (req, res, next) => res.render('teacherLogin'))

// Teacher sign up page
router.get('/teacher/signup', (req, res, next) => res.render('teacherSignup'))

// Class store page (hard coded future-feature)
router.get('/teacher/store', (req, res, next) => res.render('store'))

/**
 * Dynamic pages
 */

// Teacher dashboard page
router.get('/teacher/:uuid/dashboard', /* isAuthenticated, */(req, res, next) => {
  var uuid = req.params.uuid
  // Davis - how do we query the DB for all the teacher's classes?
  db.User.find({ where: { uuid }, include: { model: db.Class } })
    // Sending json response simply to debug - will delete before production
    .then(resp => res.json(resp))
    // .then(resp => res.render('teacherDashboard', resp))
    .catch(err => res.json(err))
})

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
