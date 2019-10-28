const jwt = require('jsonwebtoken');
const config = require('config');

//a middleware function takes in req, res, next.   next is a callback fn that moves on to next actions after middleware is done
module.exports = function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check for token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, Authorization denied' });
    }

    //verify token if there is one
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); //decode using jwt verify and secret

        req.user = decoded.user; //the user object sent in payload for jwt
        next();
    } catch (err) {
        //401 unauthorized
        res.status(401).json({ msg: 'not a valid token' });
    }
};
