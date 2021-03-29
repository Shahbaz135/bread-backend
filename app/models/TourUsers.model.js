'use strict'

module.exports = function (sequelize, DataTypes) {
  let TourUsers = sequelize.define('TourUsers', {
    TourPlanningId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'TourPlanning',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  })
  return TourUsers
}