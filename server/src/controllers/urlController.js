const redis = require ("redis")
const urlmodel = require("../models/urlModel")
const axios = require ('axios')
const shortid = require ('shortid')
const {promisify} = require("util")

// code for validation

const validation = function(value){
    if(typeof value === "undefined" || value === null || typeof value !== "string" || value.trim().length === 0){
        return false
    } else {
        return true
    }
}

//================redis config=======================//
const redisConfig = redis.createClient(
    19971,
    "redis-19971.c261.us-east-1-4.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  
  redisConfig.auth("Q3d5Ocj1lNemD62NeYoKGovSvkR6EPWk", function (err) {
    if (err) throw err;
  });
  
  redisConfig.on("connect", async function () {
    console.log("Redis is Connected...");
  });
const GET_ASYNC = promisify(redisConfig.GET).bind(redisConfig);
const SET_ASYNC = promisify(redisConfig.SETEX).bind(redisConfig);


//=================creating short url========================//
const urlShort = async(req,res) => {
  try{
      let data = req.body
      let{longUrl}=data

      if(Object.keys(data).length == 0) return res.status(400).send({status : false, message : "Oops You didn't entered anything"})

      if(!longUrl) return res.status(400).send({status : false, message : "It seem's you forgot to enter long url"})

      if(!validation(longUrl)) return res.status(400).send({status : false, message : "Sorry, It wouldn't work ! Provide Valid URL"})

     let cachedData = await GET_ASYNC(`${longUrl}`)

     if(cachedData){

      let result = JSON.parse(cachedData)

      return res.status(201).send({status: true, data: result})
      
     }

     let fetchType ={
      method: "get",
      url: longUrl,
     }

     let verifyURL = await axios(fetchType)
     .then(() => [])
     .catch(() => null)

     if(!verifyURL){
      return res.status(400).send({status: false, message : `The Link You Provide ${longUrl} seem's not valid`})
     } 

     let shortenURL =shortid.generate().toLowerCase()
     let baseURL ="http://localhost:3000/"
     let obj ={
      longUrl: longUrl.trim(),
      shortUrl: baseURL + shortenURL,
      urlCode : shortenURL
     }

     let findData= await urlmodel.findOne({ longUrl : longUrl}).select({_id:0, __v:0});
     if(findData){
     await SET_ASYNC(`${longUrl}`, 60 * 5, JSON.stringify(findData))
     return res.status(201).send({status : true, message: findData})}

     let final= await urlmodel.create(obj)
     await SET_ASYNC(`${longUrl}`, 60 * 5, JSON.stringify(obj) )
    return res.status(201).send({status: true, data: obj})

  } catch(err){
      return res.status(500).send({status : false, message: err.message})
  }
 

}
//------------------------------ Getting Data ----------------------------------------------//

let fetchData = async(req,res) => {
    try{
        let urlCode = req.params.urlCode
        if(!shortid.isValid(urlCode))
        return res.status(400).send({status :false, message: "Not A Valid URL"})
        let cachedData= await GET_ASYNC(`${urlCode}`)
        if(cachedData){
            let result = JSON.parse(cachedData)
            return res.status(302).redirect(result)
        }
        let findLongURL= await urlmodel.findOne({urlCode})
        if(!findLongURL)
        return res.status(404).send({status : false, message : "URL is not Exist !"})
        await SET_ASYNC(`${urlCode}`, 24*60*60, JSON.stringify(findLongURL.longUrl))
        return res.status(302).redirect(findLongURL.longUrl)
    }
    catch(err){
        return res.status(500).send({status : false, message: err.message})

    }
}
module.exports={fetchData,urlShort}