const mongoose=require("mongoose")


const notesmodel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    image:{
        type:String
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("notes",notesmodel)