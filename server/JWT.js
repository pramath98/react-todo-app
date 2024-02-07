const {sign,verify} = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign({userName:user.userName,id:user._id},process.env.SECRET_KEY);
    return accessToken;
}

module.exports = {createTokens};