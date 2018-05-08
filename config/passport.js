var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var db = require('../models')

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  db.User.findOne({ where: { email } })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        return done(null, false, { msg: 'Incorrect email/password combination.' })
      }
      var uuid = user.dataValues.uuid
      user.dataValues.email = null
      user.dataValues.password = null
      return done(null, { uuid })
    })
    .catch(err => done(err))
}))

passport.serializeUser((user, cb) => cb(null, user.uuid))
passport.deserializeUser((obj, cb) => cb(null, obj))

module.exports = passport
