'use strict'

module.exports = function (sequelize, DataTypes) {
  let Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Role.hasMany(models.User, { foreignKey: 'RoleId', as: 'relatedRoles' })
    }
  })
  return Role
}
