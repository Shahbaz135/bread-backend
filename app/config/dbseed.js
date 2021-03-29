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
        phone: '051456421',
        mobileNumber: '03001231234',
        email: `shahbaz@gmail.com`,
        postalCode: 12345
      })

      user.salt = user.makeSalt()
      user.password = user.encryptPassword('123', user.salt)
      user.save()
    })


  // Inserting week days
  db.WeekDays.bulkCreate([{
    day: 'Monday',
  },
  {
    day: 'Tuesday',
  },
  {
    day: 'Wednesday',
  },
  {
    day: 'Thursday',
  },
  {
    day: 'Friday',
  },
  {
    day: 'Saturday',
  },
  {
    day: 'Sunday',
  }
])
  
    
}
