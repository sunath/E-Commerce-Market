const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name:{
        type:String,
        unique:false,
        nullable:false,
        minLength:3
    },
    username:{
        type:String,
        unique:true,
        nullable:false,
        minLength:3
    },
    email:{
        type:String,
        unique:true,
        nullable:false,
    },
    password:{
        type:String,
        nullable:false,
        minLength:8
    },
    activation:{
        type:String,
        nullable:false
    },
    activated:{
        type:Boolean,
        nullable:false,
        default:false
    },
    gender:String
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel