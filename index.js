const express=require("express")
const server=express()

const app=require("./app")
server.use("/",app)
require("./DbConnection/configuration")
console.log("Server Connected")


server.listen(8000)