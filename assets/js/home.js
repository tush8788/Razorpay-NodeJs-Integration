document.getElementById('rzp-button1').onclick = function (e) {

    // create new promise 
    let promise = new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: '/payment',
            data: {
                amount: 100
            },
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        })
    })

    //then 
    promise.then((order) => {
        // console.log(order);
        var options = {
            "key": "rzp_test_EPhQo4BerlN0xY", // Enter the Key ID generated from the Dashboard
            "amount": order.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://cdn-icons-png.flaticon.com/128/4140/4140048.png",
            "order_id": order.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "/payment-verify",
            "prefill": {
                "name": "Test User",
                "email": "Test.User@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        // create instanec
        var rzp1 = new Razorpay(options);
        // call open 
        rzp1.open();
        e.preventDefault();
    })
    // error 
    .catch((error) => {
        console.log(error);
    })
    
}