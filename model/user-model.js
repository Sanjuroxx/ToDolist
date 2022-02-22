const mongoose = require("mongoose")
//user schema
let Userschema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    }
})

let UserModel = mongoose.model("user",Userschema)
module.exports = UserModel