const CategoryModel = require("../model/category-model")

module.exports.addCategory = function(req,res){
    console.log(req.body.categoryName);

    let category = new CategoryModel({
        categoryName: req.body.categoryName
    })

    category.save(function (err, success) {
        if (err) {
            console.log("err");
            res.json({ msg: "something went wrong", status: -1, data: req.body })
        } else {
            res.json({ msg: "category added", status: 200, data: success })
        }
    })
}


module.exports.getAllCategory = function (req, res) {
    CategoryModel.find(function (err, success) {
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
module.exports.deleteCategory = function(req,res){
    let categoryId = req.params.categoryId

    //delete from role where roleId = 1 
    CategoryModel.deleteOne({"_id":categoryId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })

}
module.exports.updateCategory = function(req,res){
    let categoryId = req.body.categoryId 
    let categoryName = req.body.categoryName

    CategoryModel.updateOne({_id:categoryId},{categoryName:categoryName},function(err,data){
        if(err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"updated...",status:200,data:data})
        }
    })

}