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
    passwordconfirmation:{
        type: String,
        required:[true,"please confirm your password"],
        validate:{
            validator: function(el){
                return el === this.password;
            },
            message: "Passwords are not the same"
        }
    },
    phonenumber:{
        type: String,
        required:[true,"please enter your phone number"],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

module.exports = {
	crypto,
	jwt,
	bcrypt,
	nodemailer,
	validator,
	convert,
	cloudinary,
};
