require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var helmet = require('helmet')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var redis = require('redis')
var client = redis.createClient(process.env.REDIS_URL || null)
var passport = require('./config/passport.js')
var path = require('path')
var logger = require('morgan')
var sassMiddleware = require('node-sass-middleware')
var hbs = require('hbs')
var favicon = require('serve-favicon')
var indexRouter = require('./routes/index')
var teacherRouter = require('./routes/dashboard.js')
var studentRouter = require('./routes/student.js')
// Additional .hbs setup required before using csurf
// var csurf = require('csurf')
// var csrfProtection = csrf({ cookie: true })
var app = express()
var limiter = require('express-limiter')(app, client)
app.use(helmet())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}))

app.use(session({
  cookie: {
    /* **** Enable for production **** */
    // domain: 'herokuapp.com',
    // path: '/',
    httpOnly: true,
    sameSite: true,
    secure: false, // change to 'true' for production
    maxAge: 30 * 60 * 1000 // 30 minutes
  },
  name: 'sessionId',
  secret: 'change this secret to a new random string before deployment',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new RedisStore({ client })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}))

app.use(express.static(path.join(__dirname, 'public')))

limiter({
  path: '*',
  method: 'all',
  lookup: ['connection.remoteAddress'],
  total: 200, // 200 requests per hour
  expire: 1000 * 60 * 60,
  skipHeaders: true
})

app.use('/', indexRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/students', studentRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
