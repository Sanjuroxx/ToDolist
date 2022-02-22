const bcrypt = require("bcrypt")
const UserModel = require("../model/user-model")


//add [ POST ]
module.exports.addUser = function (req, res) {

    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    //encrypt 

    let encPassword = bcrypt.hashSync(password,10)

    let role = req.body.role


    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role
    })



    user.save(function (err, data) {
        if (err) {
            res.json({ msg: "SMW", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "signup done", data: data, status: 200 })//http status code 
        }
    })


}
//retrive data

module.exports.getAllUsers = function(req,res){
    UserModel.find().populate("role").exec(function(err,success){
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data:err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}

//delete data

module.exports.deleteUser = function(req,res){
    let userId = req.params.userId

    //delete from role where roleId = 1 
    UserModel.deleteOne({"_id":userId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })

}

//update user
module.exports.updateUser = function(req,res){
    let userId = req.body.userId
    let userfirstname = req.body.userfirstname
     let useremail = req.body.useremail
     let userpassword = req.body.userpassword


    UserModel.updateOne({_id:userId},{firstname:userfirstname,email:useremail,password:userpassword},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong",status:-1,data:err})
        }else{
            res.json({msg:"update successfully......",status:200,data:data})
        }
    })
}

//login 
module.exports.login = function(req,res){

    let email = req.body.email
    let password  = req.body.password 

    let isCorrect = false; 

    UserModel.findOne({email:email},function(err,data){
        if(data){
            let ans =  bcrypt.compareSync(password,data.password)
            if(ans == true){
                    isCorrect = true
            }
        }
    
        if (isCorrect == false) {
            console.log(err)
            res.json({ msg: "Invalid Credentials...", data: req.body, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Login....", data: data, status: 200 })//http status code 
        }
    })

}