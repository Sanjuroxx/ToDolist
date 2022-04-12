// const res = require("express/lib/response")
const TaskModel = require("../model/Task-model")


module.exports.addTask = function (req, res) {
    let TaskName = req.body.TaskName
    let Description = req.body.Description
    let Time = req.body.Time
    let Priority = req.body.Priority
    let author =req.body.author

    let Task = new TaskModel({
        TaskName: TaskName,
        Description: Description,
         Time:Time,
        Priority: Priority,
        author:author
    })


    Task.save(function (err, success) {
        if (err) {
            console.log(err)
            res.json({ msg: 'Something Went Wrong', Status: -1, data: err })
        }
        else {
            res.json({ msg: "Data added", Status: 200, data: success })
        }
    })
}  


module.exports.getAllTasks = function(req,res){
   
    TaskModel.find(function(err,success){
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data:err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}


module.exports.getOneTasks = function(req,res){
   let TaskId=req.params.TaskId
    TaskModel.findById(TaskId,function(err,success){
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data:err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}
//delete data

module.exports.deleteTask = function(req,res){
    let TaskId = req.params.TaskId

    //delete from role where roleId = 1 
    TaskModel.deleteOne({"_id":TaskId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })

}

//update Task By Id
module.exports.updateTask = function(req,res){
    let TaskId = req.params.TaskId
    let TaskName = req.body.TaskName
     let Description = req.body.Description
     let Time = req.body.Time
     let Priority=req.body.Priority
                                                
    // UserModel.findByIdAndUpdate
    TaskModel.findByIdAndUpdate(TaskId,{TaskName:TaskName,Description:Description,Time:Time,Priority:Priority},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong",status:-1,data:err})
        }else{
            res.json({msg:"update successfully......",status:200,data:data})
        }
    })
}
