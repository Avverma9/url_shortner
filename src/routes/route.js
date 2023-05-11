const express= require('express')
const router=express.Router()
const urlController= require("../controllers/urlController")

router.post("/url/shorten",urlController.urlShort)
router.get("/:urlCode",urlController.fetchData)

router.all("/*", function(req,res){
    return res.status(400).send({message: "Invalid HTTP request"})
})

module.exports=router