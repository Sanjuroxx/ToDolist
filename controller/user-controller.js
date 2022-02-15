module.exports.addUser = function (req,res){
    //db insert role
    console.log(req.body.userName);
    res.json({msg:"user added",status:200,data:req.body})
}