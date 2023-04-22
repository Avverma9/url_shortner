const express = require('express')
const mongoose= require('mongoose')
const route = require()
const app= express()

app.use(express.json())
app.use("/", route)


mongoose.set('strictQuery', true)
mongoose.connect("",{
    useNewUrlParser:true
})
.then(() => console.log("MongoDB is Connected NOW"))
.catch((err) => console.log(err))

app.listen(3000, ()=>{
    console.log("Server is ready boom on port", 3000)
})