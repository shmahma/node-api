const { Test } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/tests/:id', (req, res) => {
    Test.findByPk(req.params.id)
      .then(test => {
        if(test === null){
            return res.status(404).json({ message:"nope"});
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: test })
      }).catch(err => {res.status(500).json({ message: "ops"})})
  })
}