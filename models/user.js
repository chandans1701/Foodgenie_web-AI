const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const validator = require('validator');
const { convert } = require('html-to-text');
const cloudinary = require('cloudinary').v2;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlenght: [30, 'Your name cannot exceed 30 characters']
    },
    email:{
        type: String,
        required:[true,"plaese enter your email"],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,"please enter a valid email"]
    },
    password:{
        type: String,
        required:[true,"please enter your password"],
        minlength: [8, "Your password must be at least 8 characters long"],
        select: false// this will prevent the password from being returned in any query results by default
    },
    passwordConfirmation:{
        type: String,
        required:[true,"please confirm your password"],
        validate:{
            validator: function(el){
                return el === this.password;
            },
            message: "Passwords are not the same"
        }
    },
    phoneNumber:{
        type: String,
        required:[true,"please enter your phone number"],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar:{
        public_id: String,
        url: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
},
{timestamps: true}
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirmation = undefined
})
//This method is used during login to check whether the password entered by the user matches the hashed password stored in the database.
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}
//This method is used to check whether the user changed their password after the JWT token was issued.
userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
};

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

module.exports = mongoose.model('User', userSchema)
