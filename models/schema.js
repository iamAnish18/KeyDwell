const mongoose = require('mongoose');
const Review = require('./review');
const wrapAsync = require('../utily/wrapAsync');
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
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});
keydata.post("findOneAndDelete" ,wrapAsync(async()=>{
    if(keydwells){
        await Review.deleteMany({_id : {$in : keydwells.reviews}})
    }
}));
const Keydwell = new mongoose.model("Keydwell" , keydata);
module.exports = Keydwell;
