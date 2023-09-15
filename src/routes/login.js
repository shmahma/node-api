const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require('../auth/private_key')
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
        if(!user)return res.status(400).json({msg:"non trouvé"})
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
            return res.status(401).json({msg:"mot de pas non"})
        }
        const token=jwt.sign(
            {userId:user.id},
            privatekey,
            {expiresIn: '24h'}
        )
         const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user ,token})
        
      })
    }).catch(err=>res.json({msg:"reessayer"}))
  })
}