const express=require("express")
const app=express()
const cors=require("cors")
const bodyparser=require("body-parser")
const multer=require("multer")
const path=require("path")


app.use(cors())
app.use(bodyparser.json())
app.use(express.urlencoded({extended:false}))


app.use("/images",express.static(path.join(__dirname,"public/Images")))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage
})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        res.status(200).json("uploaded successfully")
    } catch (error) {
        console.log(error)
    }
    
})

const UserController=require("./controllers/usercontroller")
const NotesController=require("./controllers/notescontroller")
app.use("/api/users",UserController)
app.use("/api/notes",NotesController)


module.exports=app