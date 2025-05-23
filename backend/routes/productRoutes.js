const express = require ("express")
const { addProduct, listProduct, removeProduct, singleProduct, updateProduct} = require ("../controllers/productControllers.js");
const multer = require ("multer");
const adminAuth = require ("../middleware/adminAuth.js");

const productRouter = express.Router()

// image storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }

})

const upload = multer({storage:storage})

productRouter.post("/add", adminAuth, upload.single("image"), addProduct)
productRouter.post("/remove", adminAuth, removeProduct)
productRouter.get("/list", listProduct)
productRouter.get("/list/:id", singleProduct)
productRouter.put("/update/:id", updateProduct)

module.exports = productRouter;