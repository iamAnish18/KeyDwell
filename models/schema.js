const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    description : {
        type : String
    },
    image : {
        filename : String,
        url : String
    },
    price : {
        type : Number,
    },
    email_id : {
        type : String,
    },
    location : {
        type : String,
    },
    country : {
        type : String,
    }
});

const HomeKey = mongoose.model("HomeKey",HomeSchema);
module.exports = HomeKey;
