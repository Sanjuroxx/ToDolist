const mongoose = require("mongoose")
//schedule_type schema
let categoryschema = new mongoose.Schema({

    categoryName :{
        type:String
    }
})

let CategoryModel = mongoose.model("category",categoryschema)
module.exports = CategoryModel