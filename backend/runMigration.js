require("dotenv").config()
const mongoose = require("mongoose")
const { ProductModel } = require("./models")
mongoose.connect(process.env.MONGODB)


ProductModel.updateMany({},{rating:0})