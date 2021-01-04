'use strict'

module.exports = function dbseed (db, sequelize) {
  // Inserting predefined data

  db.Role.create({
    name: 'Client',
    description: 'System generated client',
    isActive: true,
    isDeleted: false
  })
    .then((role) => {
      let user = new db.User({
        fName: 'Muhammad',
        lName: 'Shahbaz',
        phone: '03001231234',
        language: 'eng',
        RoleId: role.id
      })

      user.salt = user.makeSalt()
      user.hashedPassword = user.encryptPassword('zaqoota', user.salt)
      user.save()
    })
}
