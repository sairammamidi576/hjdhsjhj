const userModel = require("../models/UserModel.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("validator")

// login user
const loginUser = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User Not Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.error(error);
        res.json({success:false, message:"Error"})
    }
}
// create token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register User
const regUser = async (req,res) =>{
    const {name,password, email} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message:"User Already Exist"})
        }
        // validate email & password
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Please enter a valid Email"})
        }
        if(password.length<8){
            return res.json({success: false, message:"Please Enter a Strong Password"})
        }
        // hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.error(error);
        res.json({success:false, message:"Error"})
    }
}

// adminLogin
const adminLogin = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

module.exports = {loginUser, regUser, adminLogin}