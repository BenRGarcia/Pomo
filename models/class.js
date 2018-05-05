module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  })

  Class.associate = function (models) {
    Class.belongsTo(models.User), {
      foreignKey: {
        allowNull: false
      }
    }
    Class.hasMany(models.Student), {
      foreignKey: {
        allowNull: false
      }
    }
  }

  return Class
}
