const { Test } = require('../db/sequelize')
const { ValidationError } = require('sequelize');
module.exports = (app) => {
  app.post('/api/tests', (req, res) => {
    Test.create(req.body)
      .then(test => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: test })
      }).catch(err => {
        if(err instanceof ValidationError) return res.status(400).json({ message:err.message,data:err});
        res.status(500).json({ message: "ops"})})
  })
}