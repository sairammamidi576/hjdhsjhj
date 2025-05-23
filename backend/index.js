const express = require('express')
const cors = require ("cors")
const mongoose = require ("mongoose")
const dotEnv = require ("dotenv")
const bodyParser = require ("body-parser")
const productRouter = require ("./routes/productRoutes.js")
const userModel = require ("./models/UserModel.js")
const userRouter = require ("./routes/userRoute.js")
const cartRouter = require ("./routes/cartRoute.js")
const orderRouter = require ("./routes/orderRoute.js")

// app config
const app = express()
dotEnv.config()
const port = process.env.PORT || 2000

// middleware
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("db connected")).catch((error)=>console.error(`${error}`))

// api endpoints
app.use("/products", productRouter)
app.use("/images", express.static("uploads"))
app.use("/user", userRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)


app.listen(port,()=>{
    console.log(`server running at ${port}`);
})