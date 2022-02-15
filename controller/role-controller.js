module.exports.addRole = function (req,res){
    //db insert role
    console.log(req.body.roleName);
    res.json({msg:"role added",status:200,data:req.body})
}