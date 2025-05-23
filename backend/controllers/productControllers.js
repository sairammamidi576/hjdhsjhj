const productModel = require("../models/Poduct.js");
const fs = require("fs")

const addProduct = async (req, res) =>{
    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try{
        await product.save();
        res.json({sucess:true, message:"product added"})
    }catch(error){
        console.log(error);
        res.json({sucess:false, message:"product not added"})
    }
}

const listProduct = async (req,res) =>{
    try {
        const products = await productModel.find({})
        res.json({sucess:true, data:products})
    } catch (error) {
        console.log(`${error}`);
        res.json({success:false,message:error.message})
    }
}
const updateProduct = async (req,res) =>{
    try {
        const myProduct = await productModel.findOneAndUpdate({_id:req.params.id},{
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
        })
        if(!myProduct){
            res.status(404).json("Product Not Found")
        }
        res.status(200).json(myProduct)
    } catch (error) {
        console.error(error);
    }
}
const singleProduct = async (req,res) =>{
    try {
        const singleProduct = await productModel.findById(req.params.id);
        if(!singleProduct){
            return res.status(404).json({message:"Product Not Found"})
        }
        res.status(200).json(singleProduct)
    } catch (error) {
        console.error(error);
    }
}

const removeProduct = async (req,res) =>{
    try {
        const removeProducts = await productModel.findById(req.body.id)
        fs.unlink(`uploads/${removeProducts.image}`, ()=>{})
        await productModel.findByIdAndDelete(req.body.id)
        res.json({sucess:true, message:"deleted successfully"})
    } catch (error) {
        console.log(`${error}`);
        res.json({success:false,message:error.message})
    }
}

module.exports = {addProduct, listProduct, singleProduct, updateProduct, removeProduct}