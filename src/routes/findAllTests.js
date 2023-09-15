const { Test } = require('../db/sequelize')
const {Op} = require('sequelize')
const auth =require ('../auth/auth')

module.exports = (app) => {
  app.get('/api/tests',auth, (req, res) => {
    if(req.query.name){
        const name = req.query.name
        return Test.findAndCountAll({where: {name: {[Op.like]: `%${name}%`}}, order:['name'],limit:5})
        .then(({count,rows} )=>{
            res.json({message:count,data:rows})
        })
    }
    Test.findAll({order: ['name']})
      .then(tests => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: tests })
      }).catch(err => {
        const message = "pas de listes"
        res.status(500).json({ message,data: err })
    })
  })
}
