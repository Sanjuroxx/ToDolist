const RoleModel = require("../model/role-model")

module.exports.addRole = function (req, res) {
    //db insert role
    console.log(req.body.roleName);

    let role = new RoleModel({
        roleName: req.body.roleName
    })

    role.save(function (err, success) {
        if (err) {
            console.log("err");

            res.json({ msg: "something went Wrong!!", status: -1, data: req.body })
        } else {
            res.json({ msg: "role added", status: 200, data:success })


        }
    })
}