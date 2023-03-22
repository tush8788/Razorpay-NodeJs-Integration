const Razorpay=require('razorpay');

//create new instance 
const razorpayInstance =new Razorpay({
    key_id:"rzp_test_EPhQo4BerlN0xY",
    key_secret:"KShnGk20oG4nDOJLXE5H01GB"
});

module.exports.makePayment= async function(amount){
    try{
        amount*=100;
        console.log(amount);
        let order = await razorpayInstance.orders.create({amount});
        return order;
    }
    catch(err){
        console.log(err);
        return;
    }
}

// module.exports=makePayment;