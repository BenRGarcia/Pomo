const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        strength: password => {
          // Contains at least 1 lower, upper, number, symbol, 8-64 chars long
          const isStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])(?=.{8,64})/g
          if (!isStrong.test(password)) {
            throw new Error(`Passwords must have at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol: ! @ # $ %`)
          }
        }
      }
    }
  })

  User.prototype.validPassword = (password) => bcrypt.compareSync(password, this.password)

  User.hook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })

  User.associate = models => {
    User.hasMany(models.Log, {
      onDelete: 'CASCADE'
    })
  }

  return User
}
