const mongoose = require("mongoose")
const multer = require("multer")

const productSchema = new mongoose.Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true}
})

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema)

module.exports = productModel;