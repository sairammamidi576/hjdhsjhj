const orderModel = require("../models/OrderModel.js");
const userModel = require("../models/UserModel.js");
const  Razorpay = require("razorpay")

// global variables
const currency = "inr"
const deliveryCharges = 5

// gateway initialize
const razorpay = new Razorpay({
    key_id: "rzp_test_jVdn0KQXXZVyj9",
    key_secret: process.env.RAZORPAY_KEY_ID
})

// placing order using cash on delivery
const placeOrder = async(req,res) =>{
    try {
        const {userId, item, amount, address} = req.body;
        const orderData = {
            userId, item, amount, paymentMethod:"COD",
            payment:false, date:Date.now(), address
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"OrederPlaced"})
    } catch (error) {
        console.error(error); 
        res.json({success:false,message:error.message})  
    }
}
const placeOrderRazorPay = async(req,res) =>{
    try {
      const {userId, item, amount, address} = req.body;
        const orderData = {
            userId, item, amount, paymentMethod:"Razorpay",
            payment:false, date:Date.now(), address
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        const options = {
            amount: amount * 100,
            currency : currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        await razorpay.orders.create(options,(error,order)=>{
            if(error){
                console.error(error);
                return res.json({success:false,message:error.message})
            }
            res.json({success:true,order})
        })
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

const verifyRpay = async(req,res) =>{
    try {
        const {userId,razorpay_order_id} = req.body;
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
        if(orderInfo.status === "paid"){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"payment successful"})
        }else{
            res.json({suceess:false,message:"payment failed"})
        }
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

// All Orders Data for Admin Panel
const allOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find();
        res.json({success:true,data:orders})
    } catch (error) {
        console.error(error);
        res.json({success:false,message:"No Orders Found"})
    }
}

// user order data frontend
const userOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

// update order status
const updateStaus = async(req,res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    }catch(error){
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

module.exports = {placeOrder, placeOrderRazorPay, verifyRpay,allOrders,userOrders,updateStaus}