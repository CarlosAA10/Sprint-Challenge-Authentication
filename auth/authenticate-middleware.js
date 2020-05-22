const jwt = require('jsonwebtoken'); 

const configVars = require('../config/vars'); 

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization; 

  if(token) {
    console.log(token,'the token')

    jwt.verify(token, configVars.jwtSecret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        req.jwt = decodedToken
        next(); 
      }
    })
  }
  else {
    res.status(400).json({ message: "please provide the authentication information chungus" }); 
  }
  
};
