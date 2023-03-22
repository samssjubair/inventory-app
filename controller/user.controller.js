const { signupService, getUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

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

exports.signinController= async (req,res,next)=>{
    try {
        // const user= await signinService(req.body);
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "please provide email and password"
            })

        }
        const user= await getUserByEmail(email);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "No user found with this email"
            })
        }
         
        const isPasswordValid= user.comparePassword(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "password is not valid"
            })
        }

        if(user.status !=='active'){
            return res.status(400).json({
                success: false,
                message: "user is not active"
            })
        }

        const token=generateToken(user);

        const {password: pwd , ...others}= user.toObject();


        res.status(200).json({
            success: true,
            message: "user signed in successfully",
            data: {
                user: others,
                token: token
            }
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not signin",
            error: error.message
    })
}
}

exports.getMe= async (req,res,next)=>{
    console.log(req.user)
    try {
        const user= req.user;
        res.status(200).json({
            success: true,
            message: "user found",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not get user",
            error: error.message
        })
    }
}  