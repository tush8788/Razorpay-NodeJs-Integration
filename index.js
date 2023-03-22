const express = require('express');
const port = 8000;
const razorpay = require('razorpay');
const razorpayFun = require('./config/razorpay');
const crypto=require('crypto')

const app = express();

app.set("view engine", "ejs");
app.set("views", "./view");

app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    return res.render('home', {
        title: "title"
    })
})

app.post('/payment', async function (req, res) {
    try {
        console.log(req.body);

        let order = await razorpayFun.makePayment(req.body.amount);
        console.log(order)
        return res.status(201).json({
            success: true,
            order
        })
    }
    catch (err) {
        console.log(err);
    }

})

app.post('/payment-success', function (req, res) {
    console.log(req.body);

    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    let secret="KShnGk20oG4nDOJLXE5H01GB"

    // generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, secret);

    // Creating hmac object 
        let hmac = crypto.createHmac('sha256', secret); 
    
        // Passing the data to be hashed
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        
        // Creating the hmac in the required format
        const generated_signature = hmac.digest('hex');

    if (generated_signature == razorpay_signature) {
        return res.end("payment successfull");
    }
    else{
        return res.end("payment unsuccessfull");
    }
    
})

app.listen(port, function (err) {
    if (err) {

    }
    console.log(`server up on port ${port}`);
})