require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var helmet = require('helmet')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var redis = require('redis')
var client = redis.createClient(process.env.REDIS_URL || null)
var passport = require('./config/passport.js')
var sassConfig = require('./config/sass.js')
var limiterConfig = require('./config/limiter.js')
var sessionConfig = require('./config/session')(RedisStore, client)
var path = require('path')
var logger = require('morgan')
var sassMiddleware = require('node-sass-middleware')
var hbs = require('hbs')
var favicon = require('serve-favicon')

var indexRouter = require('./routes/index')
var teacherRouter = require('./routes/dashboard.js')
var classRouter = require('./routes/class.js')
var studentRouter = require('./routes/student.js')
var taskRouter = require('./routes/task.js')

var app = express()

app.use(helmet())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
app.use(sassMiddleware(sassConfig))

var limiter = require('express-limiter')(app, client)
limiter(limiterConfig)

app.use('/', indexRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/students', studentRouter)
app.use('/api/task', taskRouter)
app.use('/api/class', classRouter)

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
