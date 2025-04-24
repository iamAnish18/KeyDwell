const express = require('express');
const path = require('path');
let app = express();
const port = 3000;
const methodOverride = require('method-override');

//DataBase
const mongoose = require('mongoose');
const Listings = require('./models/schema');
const Listing = require('./models/schema');

main()
    .then(() => { console.log('database is connected') })
    .catch(err => { console.log(err) })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WANDER');
}

//middlawer
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

//Server
//Index route
app.get("/listings" , async(req , res)=>{
    let allListing = await Listings.find({});
    res.render('index/list.ejs' , {allListing});
});
//create route
app.get("/listings/add" , (req , res)=>{
    res.render('index/add.ejs')
});
app.post("/listings" , async(req , res)=>{
    const newlisting = new Listing(req.body.listing);
    await newlisting.save()
    res.redirect("/listings");
});

//Update route
app.get("/listings/:id/edit" , async(req , res)=>{
    let {id} = req.params;
    const listId = await Listing.findById(id);
    res.render('index/edit.ejs' , {listId});
});

app.put("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id" , async(req , res)=>{
    let {id} = req.params;
    const deleteListing = Listing.findByIdAndDelete(id);
    await deleteListing.save();
    res.redirect("/listings");
});

//show route
app.get("/listings/:id" , async(req , res)=>{
    let {id} = req.params;
    const listId = await Listing.findById(id);
    res.render('index/show.ejs', {listId});
});

app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
});
