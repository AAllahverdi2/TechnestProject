const express=require("express")
const PaymentController = require("../controller/payment.controller")
const router=express.Router()

// Post
router.post("/",PaymentController.payment)


module.exports=router