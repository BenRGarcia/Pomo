module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timer_duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    coin_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    }
  }, {
    timestamps: false,
    underscored: true
  })

  Task.associate = models => {
    Task.belongsTo(models.Student, { foreignKey: { allowNull: false } })
  }

  return Task
}
