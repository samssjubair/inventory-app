const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
exports.verifyToken=async (req,res,next)=>{
    try {
        const token= req.headers?.authorization?.split(' ')[1];
        
        if(!token){
            return res.status(400).json({
                success: false,
                message: "you are not logged in"
            })
        }

        const decoded= await promisify(jwt.verify)(token, process.env.SECRET_TOKEN);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not verify token",
            error: error.message
        })
    }
}