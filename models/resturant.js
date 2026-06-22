const moongose = require('mongoose');
const resturantSchema = new moongose.Schema({
    name:{
        type:String,
        required:[true,"Please enter resturant name"],
        trim:true,
        maxLength:[100,"Resturant name cannot exceed 100 characters"]
    },
    isveg:{
        type:Boolean,
        default:false
    },
    address:{
        type:String,
        required:[true,"Please enter resturant address"],
        trim:true,
    },
    rating:{
        type:Number,
        default:0
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    location:{
        type:{
        type:String,
        enum:["point"],
        required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    reviews:[
        {
            name:{
                type:String,
                required:[true,"Please enter your name"]
            },
            rating:{
                type:Number,
                required:[true,"Please enter a rating"]
            },
            comment:{
                type:String,
                required:[true,"Please enter a comment"]
            }
        }
    ],
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
}
})
resturantSchema.index({ location: "2dsphere" })
resturantSchema.index({address:"text"})
module.exports = moongose.model("Resturant",resturantSchema)