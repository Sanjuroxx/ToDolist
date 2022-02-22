const Schedule_typeModel = require("../model/schedule_type-model")

module.exports.addSchedule_type = function(req,res){
    console.log(req.body.schedule_typeName);

    let schedule_type = new Schedule_typeModel({
        schedule_typeName: req.body.schedule_typeName
    })

    schedule_type.save(function (err, success) {
        if (err) {
            console.log("err");
            res.json({ msg: "something went wrong", status: -1, data: req.body })
        } else {
            res.json({ msg: "schedule_type added", status: 200, data: success })
        }
    })
}


module.exports.getAllSchedule_type = function (req, res) {
    Schedule_typeModel.find(function (err, success) {
        if (err) {
            res.json({
                msg: "Something Went Wrong!!!!",
                status: -1,
                data: err
            })
        
          }  else {
                res.json({
                    msg: "data retrive successfully",
                    status: 200,
                    data: success
                })
            }
        
    })

}
module.exports.deleteSchedule_type = function(req,res){
    let schedule_typeId = req.params.schedule_typeId

    //delete from role where roleId = 1 
    Schedule_typeModel.deleteOne({"_id":schedule_typeId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })

}
module.exports.updateSchedule_type = function(req,res){
    let schedule_typeId = req.body.schedule_typeId 
    let schedule_typeName = req.body.schedule_typeName

    Schedule_typeModel.updateOne({_id:schedule_typeId},{schedule_typeName:schedule_typeName},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"updated...",status:200,data:data})
        }
    })

}