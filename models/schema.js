const { urlencoded } = require('express');
const mongoose = require('mongoose');

const KeyDwellListing = new mongoose.Schema({
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
    email_id : {
        type : String
    },
    location : {
        type : String
    },
    country : {
        type : String
    }
});
const KeyDwell = new mongoose.model("KeyDwell" , KeyDwellListing);
module.exports = KeyDwell;
