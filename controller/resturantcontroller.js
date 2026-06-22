
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")
const resturant = require("../models/resturant")

//get all resturants
exports.getAllResturants = catchAsyncErrors(async(req,res,next)=>{
    const apiFeatures = new APIFeatures(resturant.find(),req.query).search().sort()
    const resturants = await apiFeatures.query
    res.status(200).json({
        status:"success",
        count:resturants.length,
        resturant:resturants
    })
})
