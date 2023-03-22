const express=require('express');
const router = express.Router();
const homeController=require('../controller/home_controller');

//home page
router.get('/',homeController.home);

//payment order create after click pay btn
router.post('/payment',homeController.createPayment);

//verify payment this call automaticly after payment 
router.post('/payment-verify',homeController.verifyPayment);

module.exports=router;
