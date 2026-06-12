const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/sendToken")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const cloudinary = require("../config/cloudinary")

//signup a user
exports.signup = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,passwordConfirmation,phoneNumber} = req.body

let avatar = []
//avatar not provided
if(!req.body.avatar || req.body.avatar === "/image/image.png") {
    avatar = {
        public_id: "default",
        url:"/image/image.png"
    }   
}
else{
    const result = await cloudinary.UploadStream(req.body.avatar,{
        folder: "avatars",
        width: 150,
        crop: "scale"
    }
    )
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
