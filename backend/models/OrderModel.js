const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    item:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String,required:true, default:"Order Processing"},
    date:{type:Date, default:Date.now()},
    paymentMethod:{type:String, required:true},
    payment:{type:Boolean, default:false}
})

const orderModel = mongoose.models.order || mongoose.model("Order", orderSchema);

module.exports = orderModel;