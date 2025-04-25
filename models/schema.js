const mongoose = require('mongoose');

const WanderSchema = new mongoose.Schema({
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
    location : {
        type : String
    },
    country : {
        type : String
    }
});

const Listing = mongoose.model("Listing" , WanderSchema);
module.exports = Listing;
