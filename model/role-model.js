const mongoose = require("mongoose")

//schema

let Roleschema = new mongoose.Schema({
    roleName:{
        type:String
    }
})
//model

let RoleModel =mongoose.model("role",Roleschema)

module.exports=RoleModel