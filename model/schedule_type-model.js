const mongoose = require("mongoose")
//schedule_type schema
let schedule_typeschema = new mongoose.Schema({

    schedule_typeName :{
        type:String
    }
})

let Schedule_typeModel = mongoose.model("schedule_type",schedule_typeschema)
module.exports = Schedule_typeModel