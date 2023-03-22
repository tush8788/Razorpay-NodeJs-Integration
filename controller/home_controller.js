const razorpayFun = require('../config/razorpay');
const crypto = require('crypto');
const dotenv=require('dotenv').config();

//home page
module.exports.home = function (req, res) {
    return res.render('home', {
        title: "title"
    })
}

//create payment order id
module.exports.createPayment = async function (req, res) {
    try {

        let order = await razorpayFun.makePayment(req.body.amount);
        // console.log("Creaete Order :: ", order)
        return res.status(201).json({
            success: true,
            order
        })
    }
    catch (err) {
        console.log(err);
    }
}

//verify payment
module.exports.verifyPayment = function (req, res) {

    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    let secret = process.env.razorpay_secret;

    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', secret);

    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');

    //verify
    if (generated_signature == razorpay_signature) {
        return res.end("payment successfull");
    }
    else {
        return res.end("payment unsuccessfull");
    }

}