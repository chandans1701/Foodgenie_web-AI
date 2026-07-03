const mongoose = require('mongoose'); 
const menuSchema = new mongoose.Schema({
    menu: [
        {
            category:{type:String,},
            items:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FoodItem'
        },
    ]
}
    ],
    resturant :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;