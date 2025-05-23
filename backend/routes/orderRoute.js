const express = require("express")
const authMiddleware = require("../middleware/auth.js")
const { allOrders, placeOrder, placeOrderRazorPay, updateStaus, userOrders, verifyRpay } = require("../controllers/orderController.js");
const adminAuth = require("../middleware/adminAuth.js");

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStaus)

// payment gateway
orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/razorpay",authMiddleware,placeOrderRazorPay)

// user features
orderRouter.post("/userOrders",authMiddleware,userOrders)

// verify Payments
orderRouter.post ("/verifyRpay",authMiddleware,verifyRpay)

module.exports = orderRouter;