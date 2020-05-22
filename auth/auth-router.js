const router = require('express').Router();
const bcryptjs = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const Auth = require('./auth-model'); 
const { isValid } = require('../config/global-middleware'); 
const configVars = require('../config/vars'); 


router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body; 
  
  if(isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 4; 

    const hash = bcryptjs.hashSync(credentials.password, rounds); 

    credentials.password = hash; 

    Auth.add(credentials) 
      .then(user => {
        res.status(201).json({ data: user }); 
      })
      .catch(err => {
        res.status(500).json({ message: err.message }); 
      })  
  } 
  else {
    res.status(400).json({
      message: "Please provide a username and password!"
  })
  }

  

});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body; 

  if(isValid(req.body)) {
    Auth.findBy({ username: username })
      .then(([user]) => {
        if(user && bcryptjs.compareSync(password, user.password)){
          const token = createToken(user); 

          res.status(200).json({ message: "Welcome to my API Chungus, here is your token", token})

        } else {
          res.status(401).json({ message: "invalid credentials" }); 
        }
      })
  } else {
    res.status(404).json({ message: "please provide username and password!"})
  }
});

function createToken(user) {
    const payload = {
      sub: user.id, 
      username: user.username, 
    }; 
    const options = {
      expiresIn: '1d'
    }; 
    return jwt.sign(payload, configVars.jwtSecret, options); 
}

module.exports = router;
