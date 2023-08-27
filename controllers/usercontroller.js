const router=require("express").Router()
const bcrypt=require("bcrypt")

const usermodel=require("../models/UserModel")

router.post("/",async(req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(req.body.password,salt)
    req.body.password=hash
    const newUser=new usermodel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        city:req.body.city
    })
    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.post("/login",async(req,res)=>{
    try{
        const user=await usermodel.findOne({email:req.body.email})
        if(user){
            const compare=await bcrypt.compare(req.body.password,user.password)
            if(compare){
                res.status(200).json(user)
            }else{
                res.status(400).json({message:"Incorrect email/password"})
            }
        }else{
            res.status(400).json({message:"user not found"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})




module.exports=router