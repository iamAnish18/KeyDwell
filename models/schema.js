const mongoose = require('mongoose');

const homeKeySchema = new mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    image : {
        filename : String,
        url : String
    },
    price : {
        type : Number
    },
    email_id :{
        type : String
    },
    location : {
        type : String
    },
    country :{
        type:String
    }
});
const HomeKey = new mongoose.model("HomeKey" , homeKeySchema)
module.exports = HomeKey;
