const router=require("express").Router()
const notesmodel=require("../models/NotesModel")



router.post("/addnote/:id",async(req,res)=>{

    try {
        const newNote=notesmodel({
            title:req.body.title,
            content:req.body.content,
            userId:req.params.id,
            image:req.body.image
        })
        await newNote.save()
        res.status(200).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/:userId",async(req,res)=>{
    try {
        const notes=await notesmodel.find({userId:req.params.userId})
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/note/:id",async(req,res)=>{
    try {
        const notes=await notesmodel.findById(req.params.id)
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.put("/updatenote/:id",async(req,res)=>{
    try {
        const filterNote=await notesmodel.findOneAndUpdate({_id:req.params.id},{
            $set:req.body
        })
        res.status(200).json({message:"updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        await notesmodel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})
module.exports=router