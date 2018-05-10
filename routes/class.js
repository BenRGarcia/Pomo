var express = require('express')
var router = express.Router()
var db = require('../models')
var isAuthenticated = require('./utils/isAuthenticated.js')

module.exports = router
