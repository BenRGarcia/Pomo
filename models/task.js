module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    timer_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    start_time: {
      type: DataTypes.INTEGER
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    coin_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  Task.associate = function(models) {
    Task.belongsTo(models.Student), {
      foreignKey: {
        allowNull: false
      }
    }
  }

  return Task
}
