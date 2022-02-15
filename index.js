const express=require("express")
const mongoose=require("mongoose")

const rolecontroller =require("./controller/role-controller")
const usercontroller =require("./controller/user-controller")

const app=express()

//middle ware

app.use(express.json())//mobile accept json data
app.use(express.urlencoded({extended:true})) //browser 

//database
mongoose.connect('mongodb://localhost:27017/ToDolist',function(err){
    if(err)
    {
        console.log("Database connection fail......");
        console.log(err);
    }else{
        console.log("Databse connected....");
    }
})

//url of role
app.post("/roles",rolecontroller.addRole)
app.post("/users",usercontroller.addUser)

//server

app.listen(3000,function(){
    console.log("server started on 3000");
})