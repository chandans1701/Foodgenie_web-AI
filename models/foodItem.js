const moongose = require('mongoose');

const foodSchema = new moongose.Schema({
    name:{
        type:String,
        required:[true,'Please provide the name of the food item'],
        trim:true,
        maxLength:[100,'Food name should not be more than 100 characters']
    },
    price:{
        type:Number,
        required:[true,'Please provide the price of the food item'],
        min:[0,'Price cannot be negative'],
        maxlength:[5,'Price should not be more than 5 digits'],
        default:0.0
    },
    description:{
        type:String,
        required:[true,'Please provide the description of the food item'],
        trim:true
    },
    rating:{
        type:Number,
        default:0
    },
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
})