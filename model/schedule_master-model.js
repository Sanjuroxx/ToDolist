const mongoose = require("mongoose")

//schema
let Schedule_masterSchema = new mongoose.Schema({
   user:{
        type:mongoose.Schema.Types.ObjectId,
        //ref:"user"
    },
    schedule_type:{
        type:mongoose.Schema.Types.ObjectId,
      //  ref:"schedule_type"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
       // ref:"category"
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    }
})

//model

let Schedule_masterModel = mongoose.model("schedule_master",Schedule_masterSchema)//roles

module.exports = Schedule_masterModel