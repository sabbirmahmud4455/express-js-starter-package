require('dotenv').config();

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    // console.log('authHeader');
  
    // const token = authHeader && authHeader.split(' ')[1];
  
    // if (token == null) return res.sendStatus(401);
  
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)) => {
    //     if (condition) return res.sendStatus(403);
  
    //     return next(); 
    // }
    
  
    return next;
}

module.exports = {
    auth
}