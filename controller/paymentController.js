const catchAsyncerrors = require("../middleware/catchAsyncErrors");
const dotenv = require("dotenv");
dotenv.config({ path: "Backend/config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
console.log("STRIPE_API_SECRET:", process.env.STRIPE_API_SECRET);

//process payment api 

exports.processPayment = catchAsyncerrors(async (req, res, next) => {
    console.log(req.body)
        // create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            customer_email: req.user.email,
            phone_number_collection: {
                enabled: true,
            },
            line_items: req.body.cartItems.map((item) => {