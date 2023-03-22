const jwt=require('jsonwebtoken');
const User=require('../models/User');

exports.generateToken= (userInfo)=>{
    const payload={
        email: userInfo.email,
        role: userInfo.role
    }
    const token=jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '1000s'
    })
    return token;
}