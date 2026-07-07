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
            line_items: req.body.cartItems.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data:{
                        name: item.foodItem.name,
                        images: [item.foodItem.image[0].url],
                      
                    },
                      unit_amount: item.foodItem.price * 100
                },
                quantity: item.quantity
            })),
            mode: "payment",  
            shipping_address_collection: {
                allowed_countries: ["us","IN"],

            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: "delivery charges",
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 5500,//amt in paise
                            currency: "inr"
                        },
                        delivery_estimate: {
                            minimum: {
                                unit:"hour",
                                value: 1
                            },
                            maximum: { 
                                unit: "hour",
                                value: 2
                            }   
            
        })
    })
