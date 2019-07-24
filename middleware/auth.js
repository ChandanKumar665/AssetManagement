const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // console.log(req.header('Authorization'))
    // const token = req.header('x-auth-token');
    // console.log(token)
    //check for token
    if(!token)
        res.status(401).json({msg:'No token, authorization denied.'})

    try {
        //verfiy token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({msg:'invalid token'});    
    }    
        
}

module.exports = auth;