module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
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
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    underscored: true
  })

  Class.associate = (models) => {
    Class.belongsTo(models.User, { foreignKey: { allowNull: false } })
    Class.hasMany(models.Student, { foreignKey: { allowNull: true } })
  }

  return Class
}
