const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://admin:admin@cluster0.t7ljum2.mongodb.net/").then(res=>{
    console.log("Db connected")
}).catch(err=>{
    console.log(err)
})