
const { Test } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/tests/:id', (req, res) => {
    const id = req.params.id
    Test.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Test.findByPk(id).then(test => {
        if(test === null){
            return res.status(404).json({ message:"nope"});
        }
        const message = `Le pokémon ${test.name} a bien été modifié.`
        res.json({message, data: test })
      })
    }).catch(err => {res.status(500).json({ message: "ops"})})
  })
}