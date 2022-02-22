//fork

const Daily_scheduleModel = require("../model/daily_schedule-model")

//insert User
module.exports.addDaily_schedule = function (req, res) {
    
    let schedule_master =req.body.schedule_master
    let forkDate = req.body.forkDate
     let forkTime = req.body.forkTime
    let isComplete = req.body.isComplete
    let priorityId = req.body.priorityId


    let daily_schedule = new Daily_scheduleModel({
        schedule_master:schedule_master,
        forkDate:forkDate,
        forkTime:forkTime,
        isComplete:isComplete,
        priorityId:priorityId
    })


    daily_schedule.save(function (err, success) {
        if (err) {
            console.log(err);
            res.json({ msg: "something went wrong", status: -1, data: req.body })
        } else {
            res.json({ msg: " added", status: 200, data: success })
        }
    })

}
//retrive data

module.exports.getAllDaily_schedule = function(req,res){
    Daily_scheduleModel.find(function(err,success){
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data:err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}

//delete data

module.exports.deleteDaily_schedule = function(req,res){
    let daily_scheduleId = req.params.daily_scheduleId

    //delete from role where roleId = 1 
    Daily_scheduleModel.deleteOne({"_id":daily_scheduleId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })

}

//update user
// module.exports.updateDaily_schedule = function(req,res){
//     let daily_scheduleId = req.body.daily_scheduleId
//     let dailyschedulepriorityId = req.body.daily_schedulepriorityId
//     //  let useremail = req.body.useremail
//     //  let userpassword = req.body.userpassword


//     Schedule_masterModel.updateOne({_id:daily_scheduleId},{priorityId:daily_schedulepriorityId},function(err,data){
//         if(err){
//             res.json({msg:"Something Went Wrong",status:-1,data:err})
//         }else{
//             res.json({msg:"update successfully......",status:200,data:data})
//         }
//     })
// }
