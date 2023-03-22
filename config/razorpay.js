const Razorpay=require('razorpay');
const dotenv=require('dotenv').config();

//create new instance 
const razorpayInstance =new Razorpay({
    key_id:process.env.razorpay_id,
    key_secret:process.env.razorpay_secret
});

//crate order id for payment  
module.exports.makePayment= async function(amount){
    try{
        //razerpay take amount in paisa
        amount*=100;

        let order = await razorpayInstance.orders.create({amount});
        return order;
    }
    catch(err){
        console.log(err);
        return;
    }
}