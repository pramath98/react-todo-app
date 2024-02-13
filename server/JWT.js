const { sign, verify } = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign({ userName: user.userName, id: user._id }, process.env.SECRET_KEY);
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];
    if (!accessToken) return res.status(401).json({ message: 'User not Authenticated!' });

    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY);
        if (validToken) {
            req.authenticated = true;
            req.user={userName:validToken.userName, id:validToken.id,authenticated:true,token:accessToken};
            return next();
        }else{
            req.authenticated=false;
            return next();
        }
    } catch (err) {
        return res.status(403).json({ error: err });
    }
}

module.exports = { createTokens,validateToken };