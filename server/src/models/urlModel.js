const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema(
    {
        urlCode: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        longUrl : {
            type: String,
            required: true,
            validate: {
                validator : function(v){
                    return /^https?:\/\/.+$/.test(v);
                },
                message : "Invalid URL"
            },
        },
        shortUrl : {
            type : String,
            required: true,
            unique : true,
        },
    },
    {timestamps : true}
);
module.exports = mongoose.model("urlShrink", urlSchema)