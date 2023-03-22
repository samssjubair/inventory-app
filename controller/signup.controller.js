const { signupService } = require("../services/user.service");

exports.signupController=  async (req,res,next)=>{
    try {
        const user= await signupService(req.body);
        res.status(200).json({
            success: true,
            message: "user signed up successfully",
            // data: user
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not signup",
            error: error.message
        })
    }
}