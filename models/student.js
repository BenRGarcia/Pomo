module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    coin_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 }
    }
  }, {
    timestamps: false,
    underscored: true
  })

  Student.associate = models => {
    Student.belongsToMany(models.Class, { through: 'student_class' }, { foreignKey: { allowNull: false } })
    Student.hasMany(models.Task, { foreignKey: { allowNull: false } })
  }

  return Student
}
