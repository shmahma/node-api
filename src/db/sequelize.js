const { Sequelize, DataTypes } = require('sequelize')
const TestModel = require('../models/test')
const tests = require('./test-list')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('testex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Test = TestModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    console.log(tests)
    tests.map(test => {
      Test.create({
        name: test.name,
        hp: 3,
        cp: 4,
        picture: "hh",
        types: ["hh","tt"]
      }).then(test => console.log(test.toJSON()))
    })
    bcrypt.hash('souh',10).then(hash =>{
        User.create({
            username:'souh',
            password:hash
        }).then(user => console.log(user.toJSON()))
    })
    
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Test, User
}