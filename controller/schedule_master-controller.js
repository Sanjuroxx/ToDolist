const Schedule_masterModel = require("../model/schedule_master-model")

//insert User
module.exports.addSchedule_master = function (req, res) {
    
    let user =req.body.user
    let schedule_type = req.body.schedule_type
    let category = req.body.category
    let startDate = req.body.startDate
    let endDate = req.body.endDate

    let schedule_master = new Schedule_masterModel({
        user:user,
        schedule_type:schedule_type,
        category:category,
        startDate:startDate,
        endDate:endDate
    })


    schedule_master.save(function (err, success) {
        if (err) {
            console.log(err);
            res.json({ msg: "something went wrong", status: -1, data: req.body })
        } else {
            res.json({ msg: " added", status: 200, data: success })
        }
    })

}
//retrive data

module.exports.getAllSchedule_master = function(req,res){
    Schedule_masterModel.find(function(err,success){
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data:err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}

//delete data

module.exports.deleteSchedule_master = function(req,res){
    let schedule_masterId = req.params.schedule_masterId

    //delete from role where roleId = 1 
    Schedule_masterModel.deleteOne({"_id":schedule_masterId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })

}

//update schedule_master
module.exports.updateSchedule_master = function(req,res){
    let schedule_masterId = req.body.schedule_masterId
    let schedule_masterendDate = req.body.schedule_masterendDate
  
    Schedule_masterModel.updateOne({_id:schedule_masterId},{endDate:schedule_masterendDate},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong",status:-1,data:err})
        }else{
            res.json({msg:"update successfully......",status:200,data:data})
        }
    })
}