const mongoose = require("mongoose")

//schema
let Daily_scheduleSchema = new mongoose.Schema({
   schedule_master:{
        type:mongoose.Schema.Types.ObjectId,
    },
    forkDate:{
        type:String
    },
    forkTime:{
        type:String
    },
    isComplete:{
         type:String
     },
    priorityId:{
        type:String
    }
})

//model

let Daily_scheduleModel = mongoose.model("daily_schedule",Daily_scheduleSchema)//roles

module.exports = Daily_scheduleModel