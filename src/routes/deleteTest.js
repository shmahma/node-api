const { Test } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/tests/:id', (req, res) => {
    Test.findByPk(req.params.id).then(test => {
        if(test === null){
            return res.status(404).json({ message:"nope"});
        }
      const testDeleted = test;
      Test.destroy({
        where: { id: test.id }
      })
      .then(_ => {
        const message = `Le test avec l'identifiant n°${testDeleted.id} a bien été supprimé.`
        res.json({message, data: testDeleted })
      }).catch(err => {res.status(500).json({ message: "ops"})})
    })
  })
}