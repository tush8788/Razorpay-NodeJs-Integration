const express = require('express');
const port = 8000;
// const razorpay = require('razorpay');
// const razorpayFun = require('./config/razorpay');
// const crypto=require('crypto')

const app = express();

//set view engine
app.set("view engine", "ejs");
app.set("views", "./view");

app.use(express.urlencoded({ extended: false }))

// url handler
app.use('/',require('./routes/index'));

app.listen(port, function (err) {
    if (err) {

    }
    console.log(`server up on port ${port}`);
})