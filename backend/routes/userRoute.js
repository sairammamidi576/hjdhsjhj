const express = require("express")
const { adminLogin, loginUser, regUser } = require("../controllers/userController.js")

const userRouter = express.Router()

userRouter.post("/register", regUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", adminLogin)

module.exports = userRouter;