module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    coin_count: DataTypes.STRING
  })

  Student.associate = function(models) {
    Student.belongsToMany(models.Class, {through: "student_class"}), {
      foreignKey: {
        allowNull: false
      }
    }
    Student.hasMany(models.Task), {
      foreignKey: {
        allowNull: false
      }
    }
  }

  return Student
}