const express = require('express');
const path = require('path');
let app = express();
const port = 3000;

//DataBase
const mongoose = require('mongoose');
const Listings = require('./models/schema');

main()
    .then(() => { console.log('database is connected') })
    .catch(err => { console.log(err) })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WANDER');
}

//Server
app.get("/listings" , async(req , res)=>{
    let allListing = await Listings.find({});
    res.render('index/list.ejs' , {allListing});
});

app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
});
