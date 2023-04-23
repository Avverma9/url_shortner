const redis = require ("redis")
const urlmodel = require("../models/urlModel")
const axios = require ('axios')
const shortid = require ('shortid')
const {promisify} = require("util")
const urlModel = require("../models/urlModel")

// code for validation

const validation = function(value){
    if(typeof value === "undefined" || value === null || typeof value !== "string" || value.trim().length === 0){
        return false
    } else {
        return true
    }
}

//================redis config=======================//
const redisConfig= redis.createClient(
    17763,
    "redis-17763.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    {no_ready_check: true}

)
redisConfig.auth("aCzvJ5E21jJs1JinkECCude94VnCLCQp", function (err) {
    if (err) throw err;
  });
  
  redisConfig.on("connect", async function () {
    console.log("Redis is Connected...");
  });
  
  const GET_ASYNC = promisify(redisConfig.GET).bind(redisConfig);
  const SET_ASYNC = promisify(redisConfig.SETEX).bind(redisConfig);
//=================creating short url========================//
const urlShort = async (req, res) => {
    try {
      const { longUrl } = req.body;
  
      if (!longUrl) {
        return res.status(400).send({
          status: false,
          message: "It seems you forgot to enter the long URL",
        });
      }
  
      if (!validation(longUrl)) {
        return res.status(400).send({
          status: false,
          message: "Sorry, it wouldn't work! Provide a valid URL",
        });
      }
  
      const cachedData = await GET_ASYNC(longUrl);
  
      if (cachedData) {
        const result = JSON.parse(cachedData);
  
        return res.status(201).send({ status: true, data: result });
      }
  
      const [verifyURL, findData] = await Promise.all([
        axios
          .get(longUrl)
          .then(() => [])
          .catch(() => null),
        urlmodel.findOne({ longUrl }).select({ _id: 0, __v: 0 }),
      ]);
  
      if (!verifyURL) {
        return res
          .status(400)
          .send({ status: false, message: `The link you provided ${longUrl} seems not valid` });
      }
  
      const shortenURL = shortid.generate().toLowerCase();
      const baseURL = "http://localhost:3000/";
      const obj = {
        longUrl: longUrl.trim(),
        shortUrl: baseURL + shortenURL,
        urlCode: shortenURL,
      };
  
      if (findData) {
        await SET_ASYNC(longUrl, 60 * 5, JSON.stringify(findData));
  
        return res.status(201).send({ status: true, message: findData });
      }
  
      const final = await urlmodel.create(obj);
      await SET_ASYNC(longUrl, 60 * 5, JSON.stringify(obj));
  
      return res.status(201).send({ status: true, data: obj });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
  
//------------------------------ Getting Data ----------------------------------------------//

let fetchData = async(req,res) => {
    try{
        let urlCode = req.params.urlCode
        if(!shortid.validation(urlCode))
        return res.status(400).send({status :false, message: "Not A Valid URL"})
        let cachedData= await GET_ASYNC(`${urlCode}`)
        if(cachedData){
            let result = JSON.parse(cachedData)
            return res.status(302).redirect(result)
        }
        let findLongURL= await urlmodel.findOne({urlCode})
        if(!findLongURL)
        return res.status(404).send({status : false, message : "URL is not Exist !"})
        await SET_ASYNC(`${urlCode}`, 24*60*60, JSON.stringify(findLongURL))
        return res.status(302).redirect(findLongURL.longUrl)
    }
    catch(err){
        return res.status(500).send({status : false, message: err.message})

    }
}
module.exports={fetchData,urlShort}