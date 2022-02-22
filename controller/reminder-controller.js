const e = require("express")
const res = require("express/lib/response")
const ReminderModel = require("../model/reminder-model")

module.exports.addReminder = function (req, res) {
    let fork = req.body.fork
    let remDate = req.body.remDate
    let description = req.body.description

    let reminder = new ReminderModel({
        fork: fork,
        remDate: remDate,
        description: description
    })

    reminder.save(function (err, success) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!!", status: -1, data: req.body })
        } else {
            res.json({ msg: "success", status:200, data: success })
        }
    })
}

//get all

module.exports.getAllReminder = function (req, res) {
    ReminderModel.find(function (err, success) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!!", status: -1, data: err })

        } else {
            res.json({ msg: "success", status: 200, data: success })
        }
    })
}

//delete

module.exports.deleteReminder = function(req,res){
    let reminderId = req.params.reminderId
     ReminderModel.deleteOne({"_id":reminderId},function(err,success){
         if(err){
             res.json({msg:"Something Went Wrong!!!",status:-1,data:err})
         }else{
             res.json({msg:"success",status:200,data:success})
         }
     })
}