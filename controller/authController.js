const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/sendToken")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const cloudinary = require("../config/cloudinary")

//signup a user
exports.signup = catchAsyncErrors(async(req,res,next)=>{
        const { name, email, password, phoneNumber, passwordConfirmation } = req.body

let avatar = []
//avatar not provided
if(!req.body.avatar || req.body.avatar === "/image/image.png") {
    avatar = {
        public_id: "default",
        url:"/image/image.png"
    }   
}
else{
    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    avatar = {
        public_id: result.public_id,
        url: result.secure_url
    }
}
const user = await User.create({
    name,email,password,passwordConfirmation,phoneNumber,avatar
})
sendToken(user,201,res)

})

// login

exports.login = catchAsyncErrors(async(req,res,next)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const ispasswordmatched = await user.correctPassword(password, user.password)
    if(!ispasswordmatched){
        return next(new ErrorHandler("Invalid email or password",401))
} 
   sendToken(user,200,res)
})

// get all users (basic public listing for development/testing)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find().select('name email phoneNumber avatar')
    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})
    