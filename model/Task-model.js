const mongoose =require ('mongoose')

let Taskschema = new mongoose.Schema({
    TaskName:{
    type:String
    },
    Description:{
        type:String
    },
    Time:{
        type:String
    },
    Priority:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

let TaskModel = new mongoose.model("Task",Taskschema) 
module.exports=TaskModel