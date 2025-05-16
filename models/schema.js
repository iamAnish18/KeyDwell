const mongoose = require('mongoose');
let keydata = new mongoose.Schema({
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
const Keydwell = new mongoose.model("Keydwell" , keydata);
module.exports = Keydwell;
