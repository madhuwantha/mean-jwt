const  jwt = require('jsonwebtoken');

module.exports.veryfyToken = function (req,res,next) {
    let token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token) return res.status(403).send( {auth:false, massage:"No token provided"} );

    else {
        jwt.verify(token, 'SECRET#123',
            (err,decoded) =>{
                if (err)return res.status(500).send({auth:false, masssage : 'Token authorization failed'});
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )}
}
