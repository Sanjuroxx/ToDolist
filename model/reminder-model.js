const mongoose = require("mongoose")

let Reminderschema = new mongoose.Schema({
    fork:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"daily_schedule"
    },
    remDate:{
        type:String
    },
    description:{
        type:String
    }
})
let ReminderModel = mongoose.model("reminder",Reminderschema)
module.exports = ReminderModel