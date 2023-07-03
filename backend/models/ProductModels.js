const mongoose = require("mongoose")


const categorySchema = mongoose.Schema({name:{type:String,required:true,unique:true}},{timestamps:true})

const productSchema = mongoose.Schema({
    name:{
        type:String,
        uniuqe:true,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discount:{
        type:Boolean,
        default:false
    },
    discountPercent:{
        type:Number,
        default:0
    },
    company:{
        type:String,
        required:true
    },
    imageOkay:{
        type:Boolean,
        default:false
    },
    imageURL:{
        tpye:String
    },
    products:{
        type:Number,
        default:1
    },
    description:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    }
},{timestamps:true})


const CategoryModel = mongoose.model("categories",categorySchema)
const ProductModel = mongoose.model("products",productSchema)

module.exports = {CategoryModel,ProductModel}