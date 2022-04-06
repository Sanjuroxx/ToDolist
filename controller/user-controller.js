const bcrypt = require("bcrypt")
const UserModel = require("../model/user-model")
const nodemailer = require("nodemailer")
const crypto = require("crypto")


//add [ POST ]
module.exports.addUser = function (req, res) {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let gender = req.body.gender
    let email = req.body.email
    let password = req.body.password
    //encrypt 

    let encPassword = bcrypt.hashSync(password, 10)

    let role = req.body.role


    let user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
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

module.exports.getAllusers = function (req, res) {

    UserModel.find(function (err, success) {
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data: err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}


module.exports.getOneusers = function (req, res) {
    let userId = req.params.userId
    UserModel.findById(userId, function (err, success) {
        if (err) {
            res.json({ msg: "something went wrong", status: -1, data: err })

        } else {
            res.json({ msg: "retrive Successfully", status: 200, data: success })
        }
    })
}
//delete data

module.exports.deleteUser = function (req, res) {
    let userId = req.params.userId

    //delete from role where roleId = 1 
    UserModel.deleteOne({ "_id": userId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something went wrong!!!", status: -1, data: err })
        } else {
            res.json({ msg: "removed...", status: 200, data: data })
        }
    })

}

//update user
// module.exports.updateUser = function(req,res){
//     let userId = req.body.userId
//     let firstName = req.body.firstName
//     let lastName = req.body.lastName
//     let gender = req.body.gender
//      let email = req.body.email
//      let password = req.body.password

//     // UserModel.findByIdAndUpdate
//     UserModel.updateOne({_id:userId},{firstName:firstName,lastName:lastName,gender:gender,email:email,password:password},function(err,data){
//         if(err){
//             res.json({msg:"Something Went Wrong",status:-1,data:err})
//         }else{
//             res.json({msg:"update successfully......",status:200,data:data})
//         }
//     })
// }

//
module.exports.updateUser = function (req, res) {
    let userId = req.params.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let gender = req.body.gender
    let email = req.body.email
    let password = req.body.password

    // 
    UserModel.findByIdAndUpdate(userId, { firstName: firstName, lastName: lastName, gender: gender, email: email, password: password }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong", status: -1, data: err })
        } else {
            res.json({ msg: "update successfully......", status: 200, data: data })
        }
    })
}

//login 
module.exports.login = function (req, res) {

    let email = req.body.email
    let password = req.body.password

    let isCorrect = false;

    UserModel.findOne({ email: email }).populate('role').exec(function (err, data) {
        if (data) {
            let ans = bcrypt.compareSync(password, data.password)
            if (ans == true) {
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

//Forgot Password

module.exports.mailLinkToResetPassword = function (req, res) {
    let email = req.body.email
    if (email === null) {
        res.json({ msg: "Email is require...", status: -1, data: err })
    } else {
        UserModel.findOne({ email: email }, function (err, data) {
            if (err || data == null) {
                res.json({ msg: "Email not Found...", status: -1, data: err})
            } else {
                const token = crypto.randomBytes(20).toString('hex')
                data.update({
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 3600000
                });
                var transporter = nodemailer.createTransport({
                    service:'gmail',
                    port:465,
                    secure:true,
                    auth:{
                        user:'sanjuprajapati2503@gmail.com',
                        pass:'8905350703'
                        }
                });
                var mailOptions={
                    from:'sanjuprajapati2503@gmail.com',
                    to:data.email,
                    subject:'Link to Reset Password',
                    text: "click on this link to reset your password:"+`http://localhost:3000/reset/${token}`
                };
                transporter.sendMail(mailOptions,function(err,data){
                            if(err){
                                        console.log(err);

                            }else{
                                console.log('Email Sent :'+data.response);
                            }
                });
            }
        })
    }

}
module.exports.resetPassword = function(req,res){
    let email = req.body.email
    let password =req.body.password
    let hashPassword = bcrypt.hashSync(password,10)
    UserModel.findOneAndUpdate({email:email},{password:hashPassword},function(err,data){
        if(err){
            res.json({msg:"Error",status:-1,data:err})
        }
        else{
            res.json({msg:"Password Reset!",status:200,data:data})
        }
    })
    
}

