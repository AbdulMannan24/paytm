const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try{
        let authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({
                message: 'Invalid Bearer token'
            });
        }
        
        let token = authHeader.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.json({message: "Invalid User"});
        }
        
    } catch (err) {
        console.log(err);
        res.json({message: "Invalid Token"});
    }
}

module.exports = {
    authMiddleware
}
